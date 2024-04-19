import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  of,
  pairwise,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import * as AppActions from '../actions';
import { InvoicesApiService } from '../../../features/invoices/services';
import { JobAdsApiService } from '../../../features/job-ads/services';
import { Dto, JobAd } from '../../../shared/models';

@Injectable()
export class AppEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly invoiceApi: InvoicesApiService,
    private readonly jobAdApi: JobAdsApiService
  ) {}

  public deleteJobAd$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AppActions.deleteJobAd),
        switchMap((action) => {
          return this.invoiceApi.deleteInvoice(action.id).pipe(
            tap(() => console.log('Invoice deleted successfully')),
            catchError((_error) => {
              console.error('No invoice with such id');
              return of(null);
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  publishJobAd$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AppActions.setJobAdStatus),
        startWith(null),
        pairwise(),
        filter(([previousAction, currentAction]) => {
          const currStatus = currentAction?.status;
          const prevStatus = previousAction?.status;
          const currId = Number(currentAction?.id);
          const prevId = Number(previousAction?.id);

          const isStatusChangedToPublished =
            currStatus !== prevStatus && currStatus === 'published';
          const isIdChanged = currId !== prevId;

          return (
            (isIdChanged && currStatus === 'published') ||
            isStatusChangedToPublished
          );
        }),
        switchMap(([_previousAction, currentAction]) => {
          const jobId = currentAction?.id;
          if (jobId) {
            return this.jobAdApi.getJobAdById(jobId.toString()).pipe(
              switchMap((jobAdDto: Dto<JobAd>) => {
                return this.invoiceApi.createInvoice(jobAdDto);
              })
            );
          } else {
            return of(null);
          }
        })
      );
    },
    { dispatch: false }
  );
}
