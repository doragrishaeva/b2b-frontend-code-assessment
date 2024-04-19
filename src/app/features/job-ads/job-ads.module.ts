import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { JobAdsRoutingModule } from './job-ads-routing.module';
import {
  JobAdsComponent,
  JobAdModalComponent,
  JobAdCardComponent,
} from './components';

import { JobAdsApiService } from './services';
import { JobFilterPipe } from './pipes';
import { MaterialModule } from '../../material/material.module';

export function initializeApp(jobAdsApiService: JobAdsApiService) {
  return () => jobAdsApiService.getAllJobAds();
}

@NgModule({
  imports: [
    CommonModule,
    JobAdsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    JobFilterPipe,
    JobAdsComponent,
    JobAdCardComponent,
    JobAdModalComponent,
  ],
  providers: [
    JobAdsApiService,
    JobFilterPipe,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [JobAdsApiService],
      multi: true,
    },
  ],
})
export class JobAdsModule {}
