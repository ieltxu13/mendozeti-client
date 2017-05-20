import { TestBed, inject } from '@angular/core/testing';

import { ComprobanteService } from './comprobante.service';

describe('ComprobanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprobanteService]
    });
  });

  it('should ...', inject([ComprobanteService], (service: ComprobanteService) => {
    expect(service).toBeTruthy();
  }));
});
