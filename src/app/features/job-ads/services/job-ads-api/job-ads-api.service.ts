import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';

import { Dto, JobAd } from '../../../../shared/models';
import { AppFacade } from '../../../../core/store';

@Injectable({
	providedIn: 'root',
})
export class JobAdsApiService {
	private readonly baseUrl = 'http://localhost:3000/jobs';

	constructor(
		private http: HttpClient,
		private appFacade: AppFacade,
	) {}

	public getAllJobAds(): Observable<Dto<JobAd>[]> {
		return this.http.get<Dto<JobAd>[]>(this.baseUrl).pipe(
			tap((JobAdDtos: Dto<JobAd>[]) => {
				const jobAds = JobAdDtos.map((jobAdDto) => ({
					id: jobAdDto.id,
					title: jobAdDto.title,
					description: jobAdDto.description,
					skills: jobAdDto.skills,
					status: jobAdDto.status,
				}));
				this.appFacade.setJobAds(jobAds);
			}),
		);
	}

	public getJobAdById(id: string): Observable<Dto<JobAd>> {
		const url = `${this.baseUrl}/${id}`;
		return this.http.get<Dto<JobAd>>(url);
	}

	public createJobAd(jobAd: JobAd): Observable<Dto<JobAd>> {
		const jobAdDto = {
			...jobAd,
			id: jobAd.id.toString(),
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const stringifiedData = JSON.stringify(jobAdDto);
		return this.http.post<Dto<JobAd>>(this.baseUrl, stringifiedData);
	}

	public updateJobAd(jobAd: JobAd): Observable<Dto<JobAd>> {
		return this.getJobAdById(jobAd.id.toString()).pipe(
			switchMap((jobAdDto: Dto<JobAd>) => {
				jobAdDto = {
					...jobAdDto,
					...jobAd,
					updatedAt: new Date(),
				};
				return this.http.put<Dto<JobAd>>(`${this.baseUrl}/${jobAd.id}`, jobAdDto);
			}),
		);
	}

	public deleteJobAd(id: number): Observable<void> {
		const url = `${this.baseUrl}/${id}`;
		return this.http.delete<void>(url);
	}
}
