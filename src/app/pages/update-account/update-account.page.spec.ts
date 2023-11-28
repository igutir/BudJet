import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateAccountPage } from './update-account.page';

describe('UpdateAccountPage', () => {
  let component: UpdateAccountPage;
  let fixture: ComponentFixture<UpdateAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
