import { TestBed } from '@angular/core/testing';

import { NchatsService } from './nchats.service';

describe('NchatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NchatsService = TestBed.get(NchatsService);
    expect(service).toBeTruthy();
  });
});
