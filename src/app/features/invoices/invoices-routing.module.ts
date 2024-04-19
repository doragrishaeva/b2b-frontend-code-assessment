import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './components';

const routes: Routes = [{ path: '', component: InvoiceListComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InvoicesRoutingModule {}
