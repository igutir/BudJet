import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateAccountPage } from './update-account.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('UpdateAccountPage', () => {

    const fakeActivatedRoute = {
        snapshot: { paramMap: convertToParamMap({}),
        queryParams: {} },
        queryParams: of({}),
    } as ActivatedRoute;

    let component: UpdateAccountPage;
    let fixture: ComponentFixture<UpdateAccountPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, SQLite]
        }).compileComponents();
        fixture = TestBed.createComponent(UpdateAccountPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
