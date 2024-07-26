'use client';
import LoginDialog, { openModal } from '@/components/LoginDialog';
import { useSession } from 'next-auth/react';
import { applyJob, JobListing, setJustLoggedIn } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AppliedDialog, { openAppliedModal } from '@/components/AppliedDialog';

export default function ApplyButton(job: JobListing) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { justLoggedIn } = useSelector((state: any) => state.jobSlice);

  const handleApply = () => {
    if (!session) {
      openModal();
    } else {
      openAppliedModal();
    }
    dispatch(applyJob(job.id));
  };

  useEffect(() => {
    // @ts-ignore
    if (session && justLoggedIn) {
      openAppliedModal();
      dispatch(setJustLoggedIn(false));
    }
  }, [dispatch, justLoggedIn, session]);

  return (
    <div className="card-actions justify-end">
      <AppliedDialog {...job} />
      {job.applyState && session ? (
        <>
          <button className="btn btn-accent">Already Applied</button>
        </>
      ) : (
        <>
          <LoginDialog />
          <button className="btn btn-primary" onClick={handleApply}>
            Apply Now
          </button>
        </>
      )}
    </div>
  );
}
