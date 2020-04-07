import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwixxDiceComponent } from './qwixx-dice.component';

describe('QwixxDiceComponent', () => {
  let component: QwixxDiceComponent;
  let fixture: ComponentFixture<QwixxDiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwixxDiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwixxDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
