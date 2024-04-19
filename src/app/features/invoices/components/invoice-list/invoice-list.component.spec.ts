import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppFacade } from '../../../../core/store';
import { InvoiceListComponent } from './invoice-list.component';

describe('InvoiceListComponent', () => {
	let component: InvoiceListComponent;
	let fixture: ComponentFixture<InvoiceListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InvoiceListComponent],
			imports: [HttpClientTestingModule, StoreModule.forRoot({})],
			providers: [AppFacade],
		}).compileComponents();

		fixture = TestBed.createComponent(InvoiceListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
