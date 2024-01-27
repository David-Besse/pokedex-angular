import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationBoxComponent } from './information-box.component';

// Describe a test suite for the InformationBoxComponent
describe('InformationBoxComponent', () => {
  // Declare variables for the component and its fixture
  let component: InformationBoxComponent;
  let fixture: ComponentFixture<InformationBoxComponent>;

  // Execute this before each test
  beforeEach(async () => {
    // Configure the testing environment
    await TestBed.configureTestingModule({
      imports: [InformationBoxComponent] // Import the InformationBoxComponent
    })
    .compileComponents(); // Compile the components
    
    // Create a fixture for the InformationBoxComponent
    fixture = TestBed.createComponent(InformationBoxComponent);
    // Set the component to the instance of the fixture
    component = fixture.componentInstance;
    // Trigger change detection to update the component
    fixture.detectChanges();
  });

  // Test that the component is created
  it('should create', () => {
    // Expect the component to be truthy
    expect(component).toBeTruthy();
  });
});
