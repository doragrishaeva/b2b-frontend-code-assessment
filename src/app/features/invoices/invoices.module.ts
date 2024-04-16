import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './components/invoices/invoices.component';

@NgModule({
  imports: [CommonModule, InvoicesRoutingModule, InvoicesComponent],
})
export class InvoicesModule {}
