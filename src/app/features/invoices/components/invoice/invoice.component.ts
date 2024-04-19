import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Invoice } from '../../models';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponent {
  @Input() public invoice!: Invoice;
}
