import { createAction, props } from '@ngrx/store';

import { JobAd, JobAdStatus } from '../../../shared/models';

export const setJobAds = createAction(
  '[App] Set Job Ads',
  props<{ jobAds: JobAd[] }>()
);

export const deleteJobAd = createAction(
  '[App] Delete Job Ad',
  props<{ id: number }>()
);

export const setJobAd = createAction(
  '[App] Set Job Ad',
  props<{ jobAd: JobAd }>()
);

export const setJobAdStatus = createAction(
  '[App] Set Job Ad Status',
  props<{ id: number; status: JobAdStatus }>()
);

export const appActions = {
  setJobAds,
  deleteJobAd,
  setJobAd,
  setJobAdStatus,
};
