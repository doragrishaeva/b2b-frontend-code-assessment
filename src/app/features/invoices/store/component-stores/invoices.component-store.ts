import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';

import { Invoice } from '../../models';
import { InvoicesApiService } from '../../services';

interface InvoicesState {
	invoices: Invoice[];
}

export interface InvoicesViewModel {
	invoices: Invoice[];
}

@Injectable()
export class InvoicesComponentStore extends ComponentStore<InvoicesState> {
	constructor(public api: InvoicesApiService) {
		super({
			invoices: [],
		});
	}

	private readonly invoices$: Observable<Invoice[]> = this.select((state: InvoicesState) => state.invoices);

	public readonly vm$: Observable<InvoicesViewModel> = this.select(this.invoices$, (invoices: Invoice[]) => ({
		invoices,
	}));

	public readonly updateInvoices: any = this.updater((state: InvoicesState, invoices: Invoice[]) => {
		return {
			...state,
			invoices,
		};
	});

	public readonly getInvoices = this.effect((params$: Observable<void>) =>
		params$.pipe(
			switchMap(() => {
				return this.api.getAllInvoices().pipe(
					tap((invoices: Invoice[]) => {
						this.updateInvoices(invoices);
					}),
				);
			}),
		),
	);
}
