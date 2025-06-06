import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutModalPage } from './checkout-modal.page';

describe('CheckoutModalPage', () => {
  let component: CheckoutModalPage;
  let fixture: ComponentFixture<CheckoutModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
