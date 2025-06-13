import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCandidatesPage } from './saved-candidates.page';

describe('SavedCandidatesPage', () => {
  let component: SavedCandidatesPage;
  let fixture: ComponentFixture<SavedCandidatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCandidatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
