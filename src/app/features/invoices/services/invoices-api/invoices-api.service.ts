import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { Invoice } from '../../models';
import { InvoiceUtils } from '../../utils';
import { Dto, JobAd } from '../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class InvoicesApiService {
  private readonly baseUrl = 'http://localhost:3000/invoices';

  constructor(private http: HttpClient) {}

  public getAllInvoices(): Observable<Invoice[]> {
    return this.http.get<Dto<Invoice>[]>(this.baseUrl).pipe(
      map((invoiceDtos: Dto<Invoice>[]) => {
        const invoices: any[] = invoiceDtos.map((invoiceDto: Dto<Invoice>) => ({
          id: invoiceDto.id.toString(),
          jobAdId: invoiceDto.jobAdId,
          amount: invoiceDto.amount,
          dueDate: invoiceDto.dueDate,
        }));

        return invoices;
      })
    );
  }

  public createInvoice(jobAdDto: Dto<JobAd>): Observable<Dto<Invoice>> {
    const invoice = InvoiceUtils.generateInvoice(jobAdDto);
    const stringifiedData = JSON.stringify(invoice);
    return this.http.post<Dto<Invoice>>(this.baseUrl, stringifiedData);
  }

  public deleteInvoice(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
