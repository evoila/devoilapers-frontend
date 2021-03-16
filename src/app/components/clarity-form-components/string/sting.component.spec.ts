import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StingComponent } from './sting.component';

describe('InputComponent', () => {
  let component: StingComponent;
  let fixture: ComponentFixture<StingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
