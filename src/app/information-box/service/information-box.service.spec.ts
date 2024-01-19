import { TestBed } from '@angular/core/testing';

import { InformationBoxService } from './information-box.service';

describe('InformationBoxService', () => {
  let service: InformationBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
