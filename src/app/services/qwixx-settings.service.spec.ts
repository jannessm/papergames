import { TestBed } from '@angular/core/testing';

import { QwixxSettingsService } from './qwixx-settings.service';

describe('QwixxSettingsService', () => {
  let service: QwixxSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QwixxSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
