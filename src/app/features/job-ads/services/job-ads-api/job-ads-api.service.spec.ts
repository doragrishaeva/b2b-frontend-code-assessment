import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';

import { JobAdsApiService } from './job-ads-api.service';
import { AppFacade, reducer } from '../../../../core/store';
import { JobAd, JobAdStatus } from '../../../../shared/models';

describe('JobAdsApiService', () => {
  let service: JobAdsApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let appFacade: AppFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ jobAds: reducer }),
      ],
      providers: [AppFacade],
    });
    service = TestBed.inject(JobAdsApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    appFacade = TestBed.inject(AppFacade);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllJobAds', () => {
    it('should call http GET method with correct URL', () => {
      const jobAds: JobAd[] = [
        {
          id: 1,
          title: 'Test Job',
          description: 'Test Description',
          status: 'published' as JobAdStatus,
          skills: ['Test Skill'],
        },
      ];
      spyOn(httpClient, 'get').and.returnValue(of(jobAds));
      spyOn(appFacade, 'setJobAds');

      service.getAllJobAds().subscribe();

      expect(httpClient.get).toHaveBeenCalledWith(service['baseUrl']);
      expect(appFacade.setJobAds).toHaveBeenCalledWith(jobAds);
    });
  });
});
