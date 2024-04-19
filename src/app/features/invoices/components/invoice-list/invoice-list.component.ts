import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { InvoicesComponentStore } from '../../store/component-stores/invoices.component-store';
import { AppFacade } from '../../../../core/store';

@Component({
	selector: 'app-invoices',
	templateUrl: './invoice-list.component.html',
	styleUrl: './invoice-list.component.scss',
	providers: [InvoicesComponentStore],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent implements OnInit {
	public readonly vm$ = this.store.vm$;

	constructor(
		private readonly store: InvoicesComponentStore,
		public appFacade: AppFacade,
	) {}

	public ngOnInit(): void {
		this.store.getInvoices();
	}
}
