import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceComponent, InvoiceListComponent } from './components';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceComponent],
  imports: [CommonModule, InvoicesRoutingModule, MaterialModule],
})
export class InvoicesModule {}
