import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { JobAd, JobAdStatus } from '../../../../shared/models';

@Component({
	selector: 'app-job-ad-card',
	templateUrl: './job-ad-card.component.html',
	styleUrl: './job-ad-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAdCardComponent {
	@Input() public job!: JobAd;
	@Output() public deleteClick: EventEmitter<number> = new EventEmitter<number>();
	@Output() public statusChange: EventEmitter<JobAdStatus> = new EventEmitter<JobAdStatus>();

	constructor(private router: Router) {}

	public deleteJobAd(id: number): void {
		this.deleteClick.emit(id);
	}

	public changeAdStatus(status: JobAdStatus): void {
		this.statusChange.emit(status);
	}

	public editJobAd(id: number): void {
		this.router.navigate(['/edit', id]);
	}
}
