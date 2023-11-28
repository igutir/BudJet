import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApirestPage } from './apirest.page';

describe('ApirestPage', () => {
  let component: ApirestPage;
  let fixture: ComponentFixture<ApirestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApirestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
