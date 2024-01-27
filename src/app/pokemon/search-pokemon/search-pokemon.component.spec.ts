import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SearchPokemonComponent } from './search-pokemon.component';
import { PokemonService } from '../pokemon.service';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

// Describe a test suite for the SearchPokemonComponent
describe('SearchPokemonComponent', () => {
  let component: SearchPokemonComponent; // Declare the component to be tested
  let pokemonService: jasmine.SpyObj<PokemonService>; // Declare the Pokemon service as a jasmine spy
  let fixture: ComponentFixture<SearchPokemonComponent>; // Declare the fixture for the SearchPokemonComponent

  beforeEach(() => {
    // Create a spy object for the PokemonService
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
      'searchPokemonByName',
    ]);
    // Configure the TestBed module
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, SearchPokemonComponent], // Import necessary modules
      providers: [{ provide: PokemonService, useValue: pokemonServiceSpy }], // Provide the PokemonService spy
    });

    fixture = TestBed.createComponent(SearchPokemonComponent); // Create a fixture for the SearchPokemonComponent
    component = fixture.componentInstance; // Assign the component to be tested
    pokemonService = TestBed.inject(
      PokemonService
    ) as jasmine.SpyObj<PokemonService>; // Inject the PokemonService spy
  });

  // Test if the component is created
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect the component to be truthy
  });

  // Test fetching and displaying pokemons
  it('should fetch and display pokemons', () => {
    const pokemons: Pokemon[] = [
      // Define an array of Pokemon objects
      {
        name: 'Pikachu',
        id: 1,
        types: ['electric'],
        picture:
          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        created: new Date(),
        hp: 10,
        cp: 5,
      },
      {
        name: 'Charmander',
        id: 4,
        types: ['fire'],
        picture:
          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        created: new Date(),
        hp: 10,
        cp: 5,
      },
    ];
    pokemonService.searchPokemonByName.and.returnValue(of(pokemons)); // Set up the PokemonService spy to return the array of pokemons
    component.ngOnInit(); // Call the ngOnInit function of the component
    component.search('Pikachu'); // Search for Pikachu
    expect(component.pokemons$).toEqual(jasmine.any(Observable)); // Expect the pokemons$ to be an observable
  });

  // Test navigating to the pokemon detail page
  it('should navigate to pokemon detail page', () => {
    const pokemon: Pokemon = {
      // Create a Pokemon object
      name: 'Pikachu',
      id: 1,
      types: ['electric'],
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      created: new Date(),
      hp: 10,
      cp: 5,
    };
    const router = TestBed.inject(Router); // Inject the Router
    const routerSpy = spyOn(router, 'navigate'); // Create a spy on the router's navigate function
    component.goToDetail(pokemon); // Call the goToDetail function with the Pokemon object
    expect(routerSpy).toHaveBeenCalledWith(['/pokemons', 'Pikachu']); // Expect the router to have been called with the specified route
  });
});
