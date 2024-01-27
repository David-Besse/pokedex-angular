// Import the necessary modules for testing, routing, and observables
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import EditPokemonComponent from './edit-pokemon.component'; // Import the EditPokemonComponent
import { PokemonService } from '../pokemon.service'; // Import the PokemonService
import { Title } from '@angular/platform-browser'; // Import the Title module
import { Pokemon } from '../pokemon'; // Import the Pokemon model

// Describe a test suite for the EditPokemonComponent
describe('EditPokemonComponent', () => {
  let component: EditPokemonComponent; // Declare a variable for the EditPokemonComponent
  let fixture: ComponentFixture<EditPokemonComponent>; // Declare a variable for the component fixture
  let mockPokemonService: jasmine.SpyObj<PokemonService>; // Declare a variable for the mocked PokemonService
  let mockTitleService: jasmine.SpyObj<Title>; // Declare a variable for the mocked Title service
  let mockActivatedRoute: ActivatedRoute; // Declare a variable for the mocked ActivatedRoute

  // Set up the necessary dependencies for each test
  beforeEach(() => {
    // Create a spy object for the PokemonService with a method to get a Pokemon by name
    mockPokemonService = jasmine.createSpyObj('PokemonService', [
      'getPokemonByName',
    ]);
    // Create a spy object for the Title service with a method to set the title
    mockTitleService = jasmine.createSpyObj('Title', ['setTitle']);
    // Create a mocked ActivatedRoute with a snapshot containing a paramMap with a get method returning 'pikachu'
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('pikachu'),
        },
      },
    } as unknown as ActivatedRoute;

    // Configure the testing module with the necessary providers and components
    TestBed.configureTestingModule({
      imports: [EditPokemonComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService }, // Provide the mocked PokemonService
        { provide: Title, useValue: mockTitleService }, // Provide the mocked Title service
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mocked ActivatedRoute
      ],
    }).compileComponents(); // Compile the components

    // Create a fixture for the EditPokemonComponent
    fixture = TestBed.createComponent(EditPokemonComponent);
    // Retrieve the instance of the EditPokemonComponent
    component = fixture.componentInstance;
  });

  // Test to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect the component to be truthy
  });

  // Test to check if the title is set to "Pokemon not found" when the Pokemon is not found
  it('should set the title to "Pokemon not found" if the Pokemon is not found', () => {
    // Set the mocked PokemonService to return an undefined value when getting a Pokemon by name
    mockPokemonService.getPokemonByName.and.returnValue(of(undefined));
    // Call the ngOnInit method of the component
    component.ngOnInit();
    // Expect the setTitle method of the Title service to be called with "Pokemon not found"
    expect(mockTitleService.setTitle).toHaveBeenCalledWith('Pokemon not found');
  });

  // Test to check if the title is set to the Pokemon name when the Pokemon is found
  it('should set the title to the Pokemon name if the Pokemon is found', () => {
    // Create a mocked Pokemon object
    const mockPokemon: Pokemon = {
      name: 'Pikachu',
      id: 1,
      types: ['electric'],
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      created: new Date(),
      hp: 10,
      cp: 5,
    };
    // Set the mocked PokemonService to return the mocked Pokemon when getting a Pokemon by name
    mockPokemonService.getPokemonByName.and.returnValue(of([mockPokemon]));
    // Call the ngOnInit method of the component
    component.ngOnInit();
    // Expect the setTitle method of the Title service to be called with "Pikachu"
    expect(mockTitleService.setTitle).toHaveBeenCalledWith('Pikachu');
  });
});
