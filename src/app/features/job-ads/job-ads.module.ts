import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobAdsRoutingModule } from './job-ads-routing.module';
import { JobAdsComponent } from './components/job-ads/job-ads.component';

@NgModule({
  imports: [CommonModule, JobAdsRoutingModule, JobAdsComponent],
})
export class JobAdsModule {}
