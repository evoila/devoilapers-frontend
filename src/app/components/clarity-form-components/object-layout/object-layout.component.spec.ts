import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectLayoutComponent } from './object-layout.component';

describe('ObjectComponent', () => {
  let component: ObjectLayoutComponent;
  let fixture: ComponentFixture<ObjectLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
