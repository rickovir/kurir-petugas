import { TestBed, inject } from '@angular/core/testing';

import { AcaraService } from './acara.service';

describe('AcaraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcaraService]
    });
  });

  it('should be created', inject([AcaraService], (service: AcaraService) => {
    expect(service).toBeTruthy();
  }));
});
