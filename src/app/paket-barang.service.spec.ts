import { TestBed, inject } from '@angular/core/testing';

import { PaketBarangService } from './paket-barang.service';

describe('PaketBarangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaketBarangService]
    });
  });

  it('should be created', inject([PaketBarangService], (service: PaketBarangService) => {
    expect(service).toBeTruthy();
  }));
});
