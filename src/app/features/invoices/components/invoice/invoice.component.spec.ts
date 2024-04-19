import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';

import { InvoiceComponent } from './invoice.component';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceComponent],
      imports: [MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    component.invoice = {
      id: (1).toString(),
      jobAdId: 1,
      amount: 1000,
      dueDate: new Date(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display invoice id in mat-card-title', () => {
    const cardTitleElement = fixture.debugElement.query(
      By.css('mat-card-title')
    ).nativeElement;
    expect(cardTitleElement.textContent.trim()).toBe('1');
  });
});
