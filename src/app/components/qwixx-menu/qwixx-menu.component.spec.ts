import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QwixxMenuComponent } from './qwixx-menu.component';

describe('QwixxMenuComponent', () => {
  let component: QwixxMenuComponent;
  let fixture: ComponentFixture<QwixxMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QwixxMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QwixxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
