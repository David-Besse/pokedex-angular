import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

// Describe a test suite for the PokemonService
describe('PokemonService', () => {
  let service: PokemonService; // Declare the PokemonService variable
  let httpTestingController: HttpTestingController; // Declare the HttpTestingController variable
  const mockPokemons = [
    // Create an array of mock Pokemons
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

  // Set up the testing environment before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
      providers: [PokemonService], // Provide the PokemonService
    });
    service = TestBed.inject(PokemonService); // Inject the PokemonService
    httpTestingController = TestBed.inject(HttpTestingController); // Inject the HttpTestingController
  });

  // Clean up the testing environment after each test
  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no outstanding requests
  });

  // Test for retrieving a list of pokemons
  it('should retrieve a list of pokemons', () => {
    service.getPokemonList().subscribe((pokemons) => {
      // Subscribe to the getPokemonList method
      expect(pokemons).toEqual(mockPokemons); // Expect the retrieved pokemons to equal the mock pokemons
    });

    const req = httpTestingController.expectOne(
      // Expect a single HTTP request
      'http://localhost:3000/apipokemons' // Check for a request to retrieve pokemons
    );
    expect(req.request.method).toEqual('GET'); // Expect the request method to be a GET
    req.flush(mockPokemons); // Simulate a successful response with the mock pokemons
  });

  // Test for retrieving a pokemon by id
  it('should retrieve a pokemon by id', () => {
    service
      .getPokemonById(1) // Get a pokemon by id
      .subscribe((pokemon) => expect(pokemon).toEqual(mockPokemons[0])); // Subscribe to the retrieved pokemon and expect it to equal the first mock pokemon
    const req = httpTestingController.expectOne(
      // Expect a single HTTP request
      'http://localhost:3000/apipokemons/1' // Check for a request to retrieve a specific pokemon by id
    );
    expect(req.request.method).toEqual('GET'); // Expect the request method to be a GET
    req.flush(mockPokemons[0]); // Simulate a successful response with the first mock pokemon
  });

  // Test for retrieving a pokemon by name
  it('should retrieve a pokemon by name', () => {
    service
      .getPokemonByName('Pikachu') // Get a pokemon by name
      .subscribe((pokemon) => expect(pokemon).toEqual(mockPokemons)); // Subscribe to the retrieved pokemon and expect it to equal the mock pokemons
    const req = httpTestingController.expectOne(
      // Expect a single HTTP request
      'http://localhost:3000/apipokemons?name=Pikachu' // Check for a request to retrieve a specific pokemon by name
    );
    expect(req.request.method).toEqual('GET'); // Expect the request method to be a GET
    req.flush(mockPokemons[0]); // Simulate a successful response with the first mock pokemon
  });

  // Test for updating a pokemon
  it('should update a pokemon', () => {
    // Mock updated pokemon data
    const mockUpdatedPokemon = {
      name: 'Pikachu',
      id: 1,
      types: ['electric'],
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      created: new Date(),
      hp: 10,
      cp: 5,
    };
    // Call the updatePokemon service method and subscribe to the response
    service
      .updatePokemon(mockUpdatedPokemon)
      .subscribe((pokemon) => expect(pokemon).toEqual(mockUpdatedPokemon));
    // Expect a PUT request to be made to the specified endpoint
    const req = httpTestingController.expectOne(
      'http://localhost:3000/apipokemons/1'
    );
    expect(req.request.method).toEqual('PUT');
    // Simulate the backend response with the mock updated pokemon data
    req.flush(mockUpdatedPokemon);
  });

  // Test for creating a pokemon
  it('should create a pokemon', () => {
    // Mock created pokemon data
    const mockCreatedPokemon = {
      name: 'Pikachu',
      id: 1,
      types: ['electric'],
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      created: new Date(),
      hp: 10,
      cp: 5,
    };
    // Call the addPokemon service method and subscribe to the response
    service
      .addPokemon(mockCreatedPokemon)
      .subscribe((pokemon) => expect(pokemon).toEqual(mockCreatedPokemon));
    // Expect a POST request to be made to the specified endpoint
    const req = httpTestingController.expectOne(
      'http://localhost:3000/apipokemons'
    );
    expect(req.request.method).toEqual('POST');
    // Simulate the backend response with the mock created pokemon data
    req.flush(mockCreatedPokemon);
  });

  // Test for deleting a pokemon
  it('should delete a pokemon', () => {
    // Call the deletePokemon service method and subscribe to the response
    service.deletePokemon(1).subscribe();
    // Expect a DELETE request to be made to the specified endpoint
    const req = httpTestingController.expectOne(
      'http://localhost:3000/apipokemons/1'
    );
    expect(req.request.method).toEqual('DELETE');
    // Simulate the backend response with null since there's no specific data returned for delete
    req.flush(null);
  });

  // Test for checking if the service is created
  it('should be created', () => {
    // Expect the service to be truthy, i.e., not null or undefined
    expect(service).toBeTruthy();
  });
});
