import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMovementPage } from './create-movement.page';

describe('CreateMovementPage', () => {
  let component: CreateMovementPage;
  let fixture: ComponentFixture<CreateMovementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateMovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
