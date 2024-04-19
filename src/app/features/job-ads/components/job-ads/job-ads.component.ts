import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { JobAdsApiService } from '../../services';
import { JobAd, JobAdStatus } from '../../../../shared/models';
import { AppFacade } from '../../../../core/store';

@Component({
  selector: 'app-job-ads',
  templateUrl: './job-ads.component.html',
  styleUrl: './job-ads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAdsComponent {
  constructor(
    public appFacade: AppFacade,
    public router: Router,
    private api: JobAdsApiService
  ) {}

  public searchControl: FormControl = new FormControl('');

  public createJobAd(): void {
    this.router.navigate(['/create']);
  }

  public changeAdStatus(jobAd: JobAd, status: JobAdStatus): void {
    this.api.updateJobAd({ ...jobAd, status }).subscribe((updatedJobAd) => {
      this.appFacade.editJobAdStatus(
        Number(updatedJobAd.id),
        updatedJobAd.status
      );
    });
  }

  public deleteJobAd(id: number): void {
    this.api.deleteJobAd(id).subscribe(() => {
      this.appFacade.deleteJobAd(id);
    });
  }
}
