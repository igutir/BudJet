import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMovementPage } from './update-movement.page';

describe('UpdateMovementPage', () => {
  let component: UpdateMovementPage;
  let fixture: ComponentFixture<UpdateMovementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateMovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
