import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InactiveJobsPage } from './inactive-jobs.page';

describe('InactiveJobsPage', () => {
  let component: InactiveJobsPage;
  let fixture: ComponentFixture<InactiveJobsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
