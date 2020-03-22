import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwixxFailedComponent } from './qwixx-failed.component';

describe('QwixxFailedComponent', () => {
  let component: QwixxFailedComponent;
  let fixture: ComponentFixture<QwixxFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwixxFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwixxFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
