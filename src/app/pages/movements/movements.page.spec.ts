import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementsPage } from './movements.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatePipe } from '@angular/common';

describe('MovementsPage', () => {
  let component: MovementsPage;
  let fixture: ComponentFixture<MovementsPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
        imports: [DatePipe],
        providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(MovementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
