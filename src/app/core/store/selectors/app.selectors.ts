import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../reducers/app.reducer';

const getJobAdsFeature = createFeatureSelector<AppState>('app');

export const getJobAds = createSelector(getJobAdsFeature, (state: AppState) => state.jobAds);
