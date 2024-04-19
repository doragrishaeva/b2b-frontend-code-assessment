import { Pipe, PipeTransform } from '@angular/core';

import { JobAd } from '../../../../shared/models';

@Pipe({
	name: 'jobFilter',
})
export class JobFilterPipe implements PipeTransform {
	transform(jobAds: Map<number, JobAd> | null | undefined, query: string): JobAd[] {
		if (!jobAds) {
			return [];
		}

		if (!query) {
			return Array.from(jobAds.values());
		}

		return Array.from(jobAds.values()).filter((jobAd) => this.filterJobAd(jobAd, query));
	}

	private filterJobAd(jobAd: JobAd, query: string): boolean {
		const lowerCaseQuery = query.toLowerCase();
		return (
			jobAd.title.toLowerCase().includes(lowerCaseQuery) ||
			jobAd.description.toLowerCase().includes(lowerCaseQuery) ||
			jobAd.status.toLowerCase().includes(lowerCaseQuery) ||
			jobAd.skills.some((skill) => skill.toLowerCase().includes(lowerCaseQuery))
		);
	}
}
