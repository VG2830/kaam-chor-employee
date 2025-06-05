import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerPlanPage } from './employer-plan.page';

describe('EmployerPlanPage', () => {
  let component: EmployerPlanPage;
  let fixture: ComponentFixture<EmployerPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
