import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwixxBarComponent } from './qwixx-bar.component';

describe('QwixxBarComponent', () => {
  let component: QwixxBarComponent;
  let fixture: ComponentFixture<QwixxBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwixxBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwixxBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
