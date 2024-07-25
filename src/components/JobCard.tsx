'use client';
import { applyJob, JobListing } from '@/store/store';
import { useDispatch } from 'react-redux';
import LoginDialog, { openModal } from '@/components/LoginDialog';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function JobCard(job: JobListing) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleApply = () => {
    if (!session) {
      openModal();
    }
    dispatch(applyJob(job.id));
  };

  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl ">
      <figure>
        <img
          src="https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Office"
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title">
          <b>{job.companyName}</b>
        </h1>
        <h2 className="card-title">{job.jobTitle}</h2>
        <p>{job.about} </p>
        <p>
          <b>Address:</b> {job.address?.street}, {job.address?.city}, {job.address?.province}, {job.address?.postalCode}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-primary" onClick={() => router.push(`/jobs/${job.id}`)}>
            Learn More
          </button>
        </div>
        <div className="card-actions justify-end">
          {job.applyState && session ? (
            <button className="btn btn-accent">Applied</button>
          ) : (
            <>
              <LoginDialog />
              <button className="btn btn-primary" onClick={handleApply}>
                Apply
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
