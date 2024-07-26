'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import JobCard from '@/components/JobCard';
import { fetchJobs } from '@/store/jobs';
// @ts-ignore
import { JobListing } from '@/store/store';
import Loading from '@/components/Loading';

export default function JobListing() {
  const dispatch = useDispatch();
  const { jobList, isLoading, error } = useSelector((state: any) => state.jobSlice);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchJobs());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="flex flex-wrap justify-center">{error}</div>;
  }

  if (jobList.length === 0) {
    return <div className="flex flex-wrap justify-center">No jobs found.</div>;
  }

  return (
    <section className="flex flex-wrap justify-center gap-4 h-full overflow-y-auto pb-20">
      {jobList.map((job: JobListing) => (
        <JobCard key={job.id} {...job} />
      ))}
    </section>
  );
}
