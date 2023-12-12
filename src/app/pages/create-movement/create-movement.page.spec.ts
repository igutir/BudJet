import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMovementPage } from './create-movement.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CreateMovementPage', () => {
  let component: CreateMovementPage;
  let fixture: ComponentFixture<CreateMovementPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
        providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateMovementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
