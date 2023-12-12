import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAccountPage } from './create-account.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CreateAccountPage', () => {
  let component: CreateAccountPage;
  let fixture: ComponentFixture<CreateAccountPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
        providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
