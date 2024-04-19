import { createReducer, on, Action } from '@ngrx/store';

import * as actions from '../actions';
import { JobAd } from '../../../shared/models';

export interface AppState {
	jobAds: Map<number, JobAd>;
}

const initialState: AppState = {
	jobAds: new Map<number, JobAd>(),
};

const appReducer = createReducer(
	initialState,
	on(actions.setJobAds, (state: AppState, { jobAds }: { jobAds: JobAd[] }) => ({
		...state,
		jobAds: new Map<number, JobAd>(jobAds.map((jobAd) => [+jobAd.id, jobAd])),
	})),

	on(actions.deleteJobAd, (state: AppState, { id }: { id: number }) => {
		const jobAdsCloned = new Map<number, JobAd>(state.jobAds);
		jobAdsCloned.delete(+id);

		return {
			...state,
			jobAds: jobAdsCloned,
		};
	}),

	on(actions.setJobAd, (state: AppState, { jobAd }: { jobAd: any }) => ({
		...state,
		jobAds: new Map<number, JobAd>(state.jobAds).set(+jobAd.id, jobAd),
	})),
	on(actions.setJobAdStatus, (state: AppState, { id, status }) => {
		const jobAdsCloned = new Map<number, JobAd>(state.jobAds);
		jobAdsCloned.set(+id, {
			...jobAdsCloned.get(+id),
			status,
		} as JobAd);
		return {
			...state,
			jobAds: jobAdsCloned,
		};
	}),
);

export function reducer(state: AppState | undefined, action: Action) {
	return appReducer(state, action);
}
