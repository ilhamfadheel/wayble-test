import { JobListing } from '@/store/store';

export const openAppliedModal = () => {
  const modal = document.getElementById('applied_modal');
  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
  }
};

export default function AppliedDialog(job: JobListing) {
  return (
    <dialog id="applied_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h1>
          <b>Applied successfully</b>
        </h1>
        <p>
          You’ve applied to {job.companyName} to work as a {job.jobTitle}
        </p>
      </div>
    </dialog>
  );
}
