import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JobListing } from '@/store/store';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { getState, rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8000/jobs');
    const newJobs = response.data.map((job: JobListing) => ({
      ...job,
      applyState: job.applyState !== undefined ? job.applyState : false,
    }));

    const state: any = getState();
    const previousJobList: JobListing[] = state.jobSlice.jobList;

    const updatedJobList = newJobs.filter((newJob) => !previousJobList.some((prevJob) => prevJob.id === newJob.id));

    if (updatedJobList.length > 0) {
      return [...previousJobList, ...updatedJobList];
    } else {
      return previousJobList;
    }
  } catch (error: any) {
    return rejectWithValue(error.toString());
  }
});
