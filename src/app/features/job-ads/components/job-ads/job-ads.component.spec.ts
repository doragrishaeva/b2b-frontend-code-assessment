import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JobAdsComponent } from './job-ads.component';
import { AppFacade } from '../../../../core/store';
import { JobAdsApiService } from '../../services';
import { JobFilterPipe } from '../../pipes';

describe('JobAdsComponent', () => {
	let component: JobAdsComponent;
	let fixture: ComponentFixture<JobAdsComponent>;
	let appFacade: AppFacade;
	let jobAdsApiService: JobAdsApiService;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [JobAdsComponent, JobFilterPipe],
			imports: [
				MatFormFieldModule,
				MatInputModule,
				MatIconModule,
				MatButtonModule,
				ReactiveFormsModule,
				RouterTestingModule,
				HttpClientTestingModule,
				BrowserAnimationsModule,
			],
			providers: [AppFacade, JobAdsApiService, provideMockStore({})],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(JobAdsComponent);
		component = fixture.componentInstance;
		appFacade = TestBed.inject(AppFacade);
		jobAdsApiService = TestBed.inject(JobAdsApiService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
