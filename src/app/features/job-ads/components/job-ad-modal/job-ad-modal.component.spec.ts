import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdModalComponent } from './job-ad-modal.component';

describe('JobAdModalComponent', () => {
  let component: JobAdModalComponent;
  let fixture: ComponentFixture<JobAdModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
