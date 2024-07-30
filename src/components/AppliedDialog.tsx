'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearQueue } from '@/store/store';

export default function AppliedDialog() {
  const dispatch = useDispatch();
  const { appliedJob } = useSelector((state: any) => state.jobSlice);

  useEffect(() => {
    const modal = document.getElementById('applied_modal');
    const handleClose = () => {
      dispatch(clearQueue());
    };

    if (modal instanceof HTMLDialogElement) {
      if (appliedJob) {
        modal.showModal();
      }
      modal.addEventListener('close', handleClose);
    }

    return () => {
      if (modal instanceof HTMLDialogElement) {
        modal.removeEventListener('close', handleClose);
      }
    };
  }, [appliedJob, dispatch]);

  if (!appliedJob) {
    return null;
  }

  return (
    <dialog id={`applied_modal`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h1>
          <b>Applied successfully</b>
        </h1>
        <p>
          You’ve applied to {appliedJob.companyName} to work as a {appliedJob.jobTitle}
        </p>
      </div>
    </dialog>
  );
}
