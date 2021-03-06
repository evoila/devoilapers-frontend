import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ServicestoreComponent } from './servicestore.component';

describe('ServicestoreComponent', () => {
  let component: ServicestoreComponent;
  let fixture: ComponentFixture<ServicestoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
