import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

// Describe the test suite for the PageNotFoundComponent
describe('PageNotFoundComponent', () => {
  let fixture: ComponentFixture<PageNotFoundComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let component: PageNotFoundComponent;

  // Set up the test environment before each test
  beforeEach(() => {
    // Configure the testing module with the necessary imports and providers
    TestBed.configureTestingModule({
      imports: [PageNotFoundComponent], // Import the PageNotFoundComponent
      providers: [
        {
          provide: ActivatedRoute, // Provide the ActivatedRoute module
          useValue: { snapshot: { paramMap: { get: () => 'dqzdqzdzqdq' } } }, // Set the value for snapshot paramMap
        },
      ],
    });
    // Create the fixture for the PageNotFoundComponent
    fixture = TestBed.createComponent(PageNotFoundComponent);
    // Get the component instance for the PageNotFoundComponent
    component = fixture.componentInstance;
    // Trigger change detection to update the component view
    fixture.detectChanges();
  });

  // Test to check if the page not found message is rendered
  it('should render the page not found message', () => {
    // Find the header element using the CSS selector
    const headerElement = fixture.debugElement.query(By.css('h1'));
    // Assert that the header element exists
    expect(headerElement).toBeTruthy();
    // Assert that the header element contains the specified text
    expect(headerElement.nativeElement.textContent).toContain(
      "Hey, cette page n'existe pas !"
    );
  });

  // Test to check if the back link exists
  it('should have a back link', () => {
    // Find the anchor element using the CSS selector
    const anchorElement = fixture.debugElement.query(By.css('a'));
    // Assert that the anchor element exists
    expect(anchorElement).toBeTruthy();
    // Assert that the anchor element contains the specified text
    expect(anchorElement.nativeElement.textContent).toContain('Home');
  });
});
