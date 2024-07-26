'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { JobListing } from '@/store/store';
import Loading from '@/components/Loading';
import { fetchJobs } from '@/store/jobs';
import ApplyButton from '@/components/ApplyButton';

export default function JobDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { jobList, isLoading } = useSelector((state: any) => state.jobSlice); // Assuming you have isLoading in your slice
  const [job, setJob] = useState<JobListing | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs initially
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchJobs());
  }, [dispatch]);

  // Find job after jobList is updated or pathname changes
  useEffect(() => {
    if (!isLoading && jobList.length > 0) {
      const lastPath = pathname.split('/').pop();
      if (isNaN(Number(lastPath))) {
        setError('Invalid job ID');
      } else {
        const jobId = Number(lastPath);
        const foundJob = jobList.find((job: JobListing) => Number(job.id) === jobId);
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError('Job not found');
        }
      }
    }
  }, [pathname, jobList, isLoading]);

  if (error) {
    return <div className="flex flex-wrap justify-center">{error}</div>;
  }

  if (isLoading || !job) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto my-5">
      <button className="btn btn-primary mb-4" onClick={() => router.push('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Office"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h1 className="text-3xl text-white font-bold">{job.companyName}</h1>
          <h2 className="text-2xl text-white">{job.jobTitle}</h2>
        </div>
      </div>
      <div className="p-4">
        <p className="text-lg mb-4">{job.about}</p>
        <p className="mb-4">
          {!session ? (
            <>
              <b>Location:</b> {job.address?.province}
            </>
          ) : (
            <>
              <b>Address:</b> {job.address?.street}, {job.address?.city}, {job.address?.province}, {job.address?.postalCode}
            </>
          )}
        </p>
        <ApplyButton {...job} />
      </div>
    </div>
  );
}
