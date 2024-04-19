import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { JobAd, JobAdStatus } from '../../../shared/models';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { AppState } from '../reducers';

@Injectable({
	providedIn: 'root',
})
export class AppFacade {
	constructor(private store: Store<AppState>) {}

	jobAds$: Observable<Map<number, JobAd>> = this.store.pipe(select(selectors.getJobAds));

	setJobAds(jobAds: JobAd[]): void {
		this.store.dispatch(actions.setJobAds({ jobAds }));
	}

	deleteJobAd(id: number): void {
		this.store.dispatch(actions.deleteJobAd({ id }));
	}

	editJobAd(jobAd: JobAd): void {
		this.store.dispatch(actions.setJobAd({ jobAd }));
	}

	editJobAdStatus(id: number, status: JobAdStatus): void {
		this.store.dispatch(actions.setJobAdStatus({ id, status }));
	}
}
