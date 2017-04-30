import { TestBed, inject } from '@angular/core/testing';

import { EtiService } from './eti.service';

describe('EtiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtiService]
    });
  });

  it('should ...', inject([EtiService], (service: EtiService) => {
    expect(service).toBeTruthy();
  }));
});
