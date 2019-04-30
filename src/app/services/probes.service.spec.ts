import { TestBed } from '@angular/core/testing';

import { ProbesService } from './probes.service';

describe('ProbesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProbesService = TestBed.get(ProbesService);
    expect(service).toBeTruthy();
  });
});
