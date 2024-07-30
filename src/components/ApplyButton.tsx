'use client';
import LoginDialog, { openLoginModal } from '@/components/LoginDialog';
import { useSession } from 'next-auth/react';
import { applyJob, queueJob, JobListing, setJustLoggedIn } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ApplyButton(job: JobListing) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { justLoggedIn, queue } = useSelector((state: any) => state.jobSlice);

  const handleApply = () => {
    if (!session) {
      openLoginModal();
      dispatch(queueJob(job));
    } else {
      dispatch(applyJob(job.id));
    }
  };

  useEffect(() => {
    // @ts-ignore
    if (session && justLoggedIn) {
      if (queue) {
        dispatch(applyJob(queue));
      }
      dispatch(setJustLoggedIn(false));
    }
  }, [dispatch, job, justLoggedIn, queue, session]);

  return (
    <div className="card-actions justify-end">
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
