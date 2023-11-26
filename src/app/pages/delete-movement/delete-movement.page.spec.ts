import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteMovementPage } from './delete-movement.page';

describe('DeleteMovementPage', () => {
  let component: DeleteMovementPage;
  let fixture: ComponentFixture<DeleteMovementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeleteMovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
