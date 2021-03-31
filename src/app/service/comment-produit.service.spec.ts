import { TestBed } from '@angular/core/testing';

import { CommentProduitService } from './comment-produit.service';

describe('CommentProduitService', () => {
  let service: CommentProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
