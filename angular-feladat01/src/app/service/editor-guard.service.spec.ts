import { TestBed } from '@angular/core/testing';

import { EditorGuardService } from './editor-guard.service';

describe('EditorGuardService', () => {
  let service: EditorGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
