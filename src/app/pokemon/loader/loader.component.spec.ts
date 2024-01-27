import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

// Describing the test suite for the LoaderComponent
describe('LoaderComponent', () => {
  let component: LoaderComponent; // Declaring a variable to hold the LoaderComponent instance
  let fixture: ComponentFixture<LoaderComponent>; // Declaring a variable to hold the ComponentFixture for the LoaderComponent

  // Executed before each test case, setting up the testing environment
  beforeEach(async () => {
    // Configuring the testing module with the necessary imports
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();

    // Creating a ComponentFixture for the LoaderComponent
    fixture = TestBed.createComponent(LoaderComponent);
    // Getting the instance of the LoaderComponent
    component = fixture.componentInstance;
    // Triggering change detection to initialize the component
    fixture.detectChanges();
  });

  // Test case to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Expecting the component to be truthy, indicating it has been successfully created
  });
});
