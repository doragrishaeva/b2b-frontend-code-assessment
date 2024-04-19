import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Router } from '@angular/router';

import { JobAdMode } from '../models';
import { JobAd } from '../../../shared/models';
import { JobAdsApiService } from '../services';
import { AppFacade } from '../../../core/store';

interface JobAdForm {
	title: string;
	description: string;
	skills: string[];
}

interface JobAdsState {
	id: number;
	mode: JobAdMode;
	form: JobAdForm;
}

export interface JobAdsViewModel {
	mode: JobAdMode;
	form: JobAdForm;
}

@Injectable()
export class JobAdComponentStore extends ComponentStore<JobAdsState> {
	constructor(
		private appFacade: AppFacade,
		private api: JobAdsApiService,
		private router: Router,
	) {
		super({
			id: 0,
			mode: JobAdMode.Create,
			form: {
				title: '',
				description: '',
				skills: [],
			},
		});
	}

	private readonly id$: Observable<number> = this.select((state: JobAdsState) => state.id);

	private readonly mode$: Observable<JobAdMode> = this.select((state: JobAdsState) => state.mode);

	private readonly form$: Observable<JobAdForm> = this.select((state: JobAdsState) => state.form);

	public readonly vm$: Observable<JobAdsViewModel> = this.select(
		this.mode$,
		this.form$,
		(mode: JobAdMode, form: JobAdForm) => ({
			mode,
			form,
		}),
	);

	public readonly updateId = this.updater((state: JobAdsState, id: number) => {
		return {
			...state,
			id,
		};
	});

	public readonly updateMode = this.updater((state: JobAdsState, mode: JobAdMode) => {
		return {
			...state,
			mode,
		};
	});

	public readonly updateForm = this.updater((state: JobAdsState, form: JobAdForm) => {
		return {
			...state,
			form,
		};
	});

	public readonly init = this.effect((params$: Observable<any>) =>
		params$.pipe(
			map((params) => Number(params['id'])),
			tap((id) => {
				const mode = id ? JobAdMode.Edit : JobAdMode.Create;
				this.updateId(id);
				this.updateMode(mode);
			}),
			withLatestFrom(this.appFacade.jobAds$),
			tap(([id, jobAds]) => {
				this.initForm(jobAds.get(id));
			}),
		),
	);

	public readonly submitForm = this.effect((params$: Observable<JobAdForm>) =>
		params$.pipe(
			withLatestFrom(this.id$, this.appFacade.jobAds$),
			map(([form, id, jobAds]) => {
				const currentJobAd = jobAds.get(+id);
				let result: JobAd;
				if (currentJobAd) {
					result = { ...currentJobAd, ...form };
				} else {
					result = { ...form, id: this.generateId(), status: 'draft' };
				}

				return { id, result };
			}),
			switchMap(({ id, result }) => {
				return id ? this.api.updateJobAd(result) : this.api.createJobAd(result);
			}),
			tap((result: any) => {
				this.appFacade.editJobAd(result);
				this.router.navigate(['/job-ads']);
			}),
		),
	);

	public readonly cancel = this.effect((params$: Observable<void>) =>
		params$.pipe(
			tap(() => {
				this.router.navigate(['/job-ads']);
			}),
		),
	);

	readonly checkNameExists = (name$: Observable<string>) =>
		name$.pipe(
			withLatestFrom(this.appFacade.jobAds$, this.id$),
			map(([name, jobAds, id]) => {
				const jobAdExisted = [...jobAds.values()].find(
					(jobAd) => jobAd.title.toLowerCase() === name.toLowerCase(),
				);

				const jobAdExists = jobAdExisted && +jobAdExisted.id !== +id;

				return jobAdExists;
			}),
		);

	private initForm(jobAd: JobAd | undefined): void {
		if (jobAd) {
			const { title, description, skills } = jobAd;
			this.updateForm({ title, description, skills });
		} else {
			this.updateForm({ title: '', description: '', skills: [] });
		}
	}

	private generateId(): number {
		const timestamp: number = new Date().getTime();
		const random: number = Math.floor(Math.random() * 1000);
		return parseInt(`${timestamp}${random}`, 10);
	}
}
