import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobAdsComponent } from './components/job-ads/job-ads.component';

const routes: Routes = [{ path: '', component: JobAdsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobAdsRoutingModule {}
