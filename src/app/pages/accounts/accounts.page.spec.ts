import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsPage } from './accounts.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatePipe } from '@angular/common';

describe('AccountsPage', () => {
  let component: AccountsPage;
  let fixture: ComponentFixture<AccountsPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
        imports: [DatePipe],
        providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(AccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
