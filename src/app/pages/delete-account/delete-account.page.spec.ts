import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAccountPage } from './delete-account.page';

describe('DeleteAccountPage', () => {
  let component: DeleteAccountPage;
  let fixture: ComponentFixture<DeleteAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeleteAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
