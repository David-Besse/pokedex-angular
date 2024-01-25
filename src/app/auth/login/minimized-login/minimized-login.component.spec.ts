import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizedLoginComponent } from './minimized-login.component';

describe('MinimizedLoginComponent', () => {
  let component: MinimizedLoginComponent;
  let fixture: ComponentFixture<MinimizedLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimizedLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinimizedLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
