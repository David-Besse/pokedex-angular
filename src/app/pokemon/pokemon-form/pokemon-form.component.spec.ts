import { TestBed } from '@angular/core/testing';
import { PokemonFormComponent } from './pokemon-form.component';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent; // Declaring a variable to hold the PokemonFormComponent instance
  let pokemonService: PokemonService; // Declaring a variable to hold an instance of PokemonService

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Configuring the testing module
      imports: [PokemonFormComponent, HttpClientTestingModule, FormsModule], // Importing necessary modules
      providers: [PokemonService, Router], // Providing the PokemonService and Router
    });

    component = TestBed.createComponent(PokemonFormComponent).componentInstance; // Creating an instance of PokemonFormComponent
  });

  it('should create', () => {
    // Test case to check if the component is created
    expect(component).toBeTruthy(); // Expecting the component to be truthy
  });

  it('should initialize types and isAddForm', () => {
    // Test case to check the initialization of types and isAddForm
    pokemonService = TestBed.inject(PokemonService); // Injecting an instance of PokemonService
    spyOn(pokemonService, 'getPokemonTypesList').and.returnValue(
      // Spying on the getPokemonTypesList method of PokemonService
      of(['type1', 'type2', 'type3']) // Returning an observable of an array of types
    );

    component.ngOnInit(); // Calling the ngOnInit method of the component
    expect(component.types).toEqual(['type1', 'type2', 'type3']); // Expecting the types to be initialized with the array of types
    expect(component.isAddForm).toBe(false); // Expecting isAddForm to be false
  });

  it('should check if pokemon has type', () => {
    // Test case to check if the component can check if a pokemon has a specific type
    const mockPokemon: Pokemon = {
      // Creating a mock Pokemon object
      id: 1,
      name: 'pikachu',
      hp: 100,
      cp: 10,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      types: ['type1', 'type2'], // Setting the types of the mock pokemon
      created: new Date(),
    };
    component.pokemon = mockPokemon; // Assigning the mock pokemon to the component

    expect(component.hasType('type1')).toBe(true); // Expecting the component to have the type 'type1'
    expect(component.hasType('type3')).toBe(false); // Expecting the component to not have the type 'type3'
  });

  // Test for validating if the type is valid
  it('should validate if type is valid', () => {
    // Create a mock Pokemon object
    const mockPokemon: Pokemon = {
      id: 1,
      name: 'pikachu',
      hp: 100,
      cp: 10,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      types: ['type1', 'type2'],
      created: new Date(),
    };
    // Assign the mock Pokemon object to the component
    component.pokemon = mockPokemon;

    // Validate if the type 'type5' is valid for the mock Pokemon
    expect(component.isTypesValid('type5')).toBe(true);

    // Create another mock Pokemon object
    const mockPokemonTwo: Pokemon = {
      id: 1,
      name: 'pikachu',
      hp: 100,
      cp: 10,
      picture:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
      types: ['type1', 'type2', 'type3'],
      created: new Date(),
    };
    // Assign the second mock Pokemon object to the component
    component.pokemon = mockPokemonTwo;

    // Validate if the type 'type5' is valid for the second mock Pokemon
    expect(component.isTypesValid('type5')).toBe(false);
  });

  // Test for submitting the form
  it('should submit the form', () => {
    // Set the isAddForm property of the component to true
    component.isAddForm = true;
    // Create a mock PokemonService
    const pokemonService = TestBed.inject(PokemonService);
    // Stub the addPokemon and updatePokemon methods of the mock PokemonService
    spyOn(pokemonService, 'addPokemon').and.returnValue(of());
    spyOn(pokemonService, 'updatePokemon').and.returnValue(of());

    // Call the onSubmit method of the component
    component.onSubmit();

    // Validate that the addPokemon method of the mock PokemonService was called with the component's Pokemon object
    expect(pokemonService.addPokemon).toHaveBeenCalledWith(component.pokemon);

    // Set the isAddForm property of the component to false
    component.isAddForm = false;
    // Call the onSubmit method of the component again
    component.onSubmit();

    // Validate that the updatePokemon method of the mock PokemonService was called with the component's Pokemon object
    expect(pokemonService.updatePokemon).toHaveBeenCalledWith(
      component.pokemon
    );
  });

  // Test for navigating back
  it('should navigate back', () => {
    // Create a mock Router
    const router = TestBed.inject(Router);
    // Stub the navigate method of the mock Router
    spyOn(router, 'navigate').and.callThrough();
    // Call the goBack method of the component
    component.goBack();

    // Validate that the navigate method of the mock Router was called with the '/pokemons' route
    expect(router.navigate).toHaveBeenCalledWith(['/pokemons']);
  });
});
