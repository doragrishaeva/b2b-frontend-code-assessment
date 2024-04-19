import { JobFilterPipe } from './job-filter.pipe';
import { JobAd } from '../../../../shared/models';

describe('JobFilterPipe', () => {
  let pipe: JobFilterPipe;

  beforeEach(() => {
    pipe = new JobFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if jobAds is null', () => {
    const jobAds: Map<number, JobAd> | null | undefined = null;
    const query = '';
    const result = pipe.transform(jobAds, query);
    expect(result).toEqual([]);
  });

  it('should return empty array if jobAds is undefined', () => {
    const jobAds: Map<number, JobAd> | null | undefined = undefined;
    const query = '';
    const result = pipe.transform(jobAds, query);
    expect(result).toEqual([]);
  });

  it('should return empty array if jobAds is empty map', () => {
    const jobAds: Map<number, JobAd> | null | undefined = new Map();
    const query = '';
    const result = pipe.transform(jobAds, query);
    expect(result).toEqual([]);
  });
});
