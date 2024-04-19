import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/job-ads', pathMatch: 'full' },
  {
    path: 'job-ads',
    loadChildren: () =>
      import('./features/job-ads/job-ads.module').then((m) => m.JobAdsModule),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./features/invoices/invoices.module').then(
        (m) => m.InvoicesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
