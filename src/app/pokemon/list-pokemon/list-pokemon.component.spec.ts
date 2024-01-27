import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import ListPokemonComponent from './list-pokemon.component';
import { BrowserSessionStorageService } from '../../browser-storage.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

// Define the test suite for the ListPokemonComponent
describe('ListPokemonComponent', () => {
  let component: ListPokemonComponent;
  let fixture: ComponentFixture<ListPokemonComponent>;

  // Set up the component for testing
  beforeEach(async () => {
    // Create a fake ActivatedRoute with a snapshot containing a paramMap with an id of 'pokemons'
    const fakeActivatedRoute = {
      snapshot: { paramMap: convertToParamMap({ id: 'pokemons' }) },
    } as ActivatedRoute;

    // Configure the testing module with necessary imports and providers
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost:3000' }, // Provide the BASE_URL
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }, // Provide the fake ActivatedRoute
        BrowserSessionStorageService, // Add the BrowserSessionStorageService
      ],
    }).compileComponents(); // Compile the components

    // Create a fixture for the ListPokemonComponent
    fixture = TestBed.createComponent(ListPokemonComponent);
    // Retrieve the instance of the ListPokemonComponent
    component = fixture.componentInstance;
    // Trigger change detection
    fixture.detectChanges();
  });

  // Test case: Check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect the component to be truthy
  });
});
