import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobAdsComponent, JobAdModalComponent } from './components';

const routes: Routes = [
  { path: '', component: JobAdsComponent },
  { path: 'create', component: JobAdModalComponent },
  { path: 'edit/:id', component: JobAdModalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobAdsRoutingModule {}
