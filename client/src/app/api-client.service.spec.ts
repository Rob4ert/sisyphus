import { TestBed } from '@angular/core/testing';

import { APIClientService } from './api-client.service';

describe('APIClientService', () => {
  let service: APIClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
