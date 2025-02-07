'use client';
import { JobListing } from '@/store/store';
import { useRouter } from 'next/navigation';
import ApplyButton from '@/components/ApplyButton';
import { useSession } from 'next-auth/react';

export default function JobCard(job: JobListing) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl max-h-[24rem]">
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
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-primary" onClick={() => router.push(`/jobs/${job.id}`)}>
            Learn More
          </button>
        </div>
        <ApplyButton {...job} />
      </div>
    </div>
  );
}
