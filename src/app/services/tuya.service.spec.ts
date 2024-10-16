import { TestBed } from '@angular/core/testing';

import { TuyaService } from './tuya.service';

describe('TuyaService', () => {
  let service: TuyaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuyaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
