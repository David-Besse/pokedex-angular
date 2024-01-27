import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import DetailPokemonComponent from './detail-pokemon.component';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

describe('DetailPokemonComponent', () => {
  let component: DetailPokemonComponent;
  let fixture: ComponentFixture<DetailPokemonComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockPokemon: Pokemon = {
    name: 'Pikachu',
    id: 1,
    types: ['electric'],
    picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    created: new Date(),
    hp: 10,
    cp: 5,
  };

  beforeEach(() => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', [
      'getPokemonByName',
      'deletePokemon',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: { get: jasmine.createSpy('get').and.returnValue('pikachu') },
      },
    });

    // Configure the testing module for TestBed
    TestBed.configureTestingModule({
      // Import the DetailPokemonComponent
      imports: [DetailPokemonComponent],
      // Provide mock implementations for the PokemonService, Router, and ActivatedRoute
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    // Create a test bed component for the DetailPokemonComponent
    fixture = TestBed.createComponent(DetailPokemonComponent);

    // Get the instance of the test bed component
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This test case checks the behavior of the ngOnInit method in the component.
  it('ngOnInit should fetch and initialize the selected Pokemon and title', () => {
    // Mocking the getPokemonByName method of the PokemonService to return an observable with the mockPokemon when called.
    mockPokemonService.getPokemonByName.and.returnValue(of([mockPokemon]));

    // Calling the ngOnInit method of the component.
    component.ngOnInit();

    // Expecting that the getPokemonByName method of the mockPokemonService is called with the argument 'pikachu'.
    expect(mockPokemonService.getPokemonByName).toHaveBeenCalledWith('pikachu');
    // Expecting that the pokemonSelected property of the component is initialized with the value of mockPokemon.
    expect(component.pokemonSelected).toEqual(mockPokemon);
  });

  // Test case for the ngOnInit method when the Pokemon is not found
  it('ngOnInit should handle case when Pokemon is not found', () => {
    // Mock the getPokemonByName method of the PokemonService and make it return undefined
    mockPokemonService.getPokemonByName.and.returnValue(of(undefined));

    // Call the ngOnInit method of the component
    component.ngOnInit();

    // Verify that the getPokemonByName method of the PokemonService was called with the argument 'pikachu'
    expect(mockPokemonService.getPokemonByName).toHaveBeenCalledWith('pikachu');
    // Verify that the pokemonSelected property of the component is undefined
    expect(component.pokemonSelected).toBeUndefined();
  });

  // This test case checks if the goBack method navigates to the previous "/pokemons/" route
  it('goBack should navigate to the previous "/pokemons/" route', () => {
    // Call the goBack method of the component
    component.goBack();
    // Ensure that the navigate method of the mockRouter is called with the ['/pokemons/'] route as the argument
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pokemons/']);
  });

  // This test case checks if the goEdit method of the component navigates to the edit page for a specific pokemon.
  it('goEdit should navigate to the edit page for a specific pokemon', () => {
    // Call the goEdit method of the component with the mockPokemon as the parameter
    component.goEdit(mockPokemon);
    // Expect that the mockRouter.navigate method has been called with the specified route
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/pokemons/edit/Pikachu',
    ]);
  });

  // This test case checks if the goDelete method in the component deletes a pokemon and navigates to "/pokemons"

  it('goDelete should delete a pokemon and navigate to "/pokemons"', () => {
    // Mocking the deletePokemon method of the pokemon service to return an observable of null
    mockPokemonService.deletePokemon.and.returnValue(of(null));

    // Calling the goDelete method of the component with a mock pokemon
    component.goDelete(mockPokemon);

    // Expecting the deletePokemon method of the pokemon service to have been called with the id 1
    expect(mockPokemonService.deletePokemon).toHaveBeenCalledWith(1);

    // Expecting the navigate method of the router to have been called with the route '/pokemons'
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pokemons']);
  });
});
