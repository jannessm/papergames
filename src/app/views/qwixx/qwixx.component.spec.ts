import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwixxComponent } from './qwixx.component';

describe('QwixxComponent', () => {
  let component: QwixxComponent;
  let fixture: ComponentFixture<QwixxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwixxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwixxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
