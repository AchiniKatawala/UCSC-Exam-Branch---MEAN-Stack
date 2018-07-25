import { TestBed, inject } from '@angular/core/testing';

import { RepeatacceptService } from './repeataccept.service';

describe('RepeatacceptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepeatacceptService]
    });
  });

  it('should be created', inject([RepeatacceptService], (service: RepeatacceptService) => {
    expect(service).toBeTruthy();
  }));
});
