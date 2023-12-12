import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMovementPage } from './update-movement.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('UpdateMovementPage', () => {

    const fakeActivatedRoute = {
        snapshot: { paramMap: convertToParamMap({}),
        queryParams: {} },
        queryParams: of({}),
    } as ActivatedRoute;

    let component: UpdateMovementPage;
    let fixture: ComponentFixture<UpdateMovementPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, SQLite]
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateMovementPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
