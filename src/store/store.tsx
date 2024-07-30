import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJobs } from '@/store/jobs';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

interface JobState {
  jobList: JobListing[];
  queue: number | null;
  appliedJob: JobListing | null;
  justLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface JobListing {
  id: number;
  companyName: string;
  jobTitle: string;
  about: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  applyState: boolean;
  job?: JobListing;
}

const initialState: JobState = {
  jobList: [],
  queue: null,
  appliedJob: null,
  justLoggedIn: false,
  isLoading: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'appliedJobsSlice',
  initialState,
  reducers: {
    applyJob: (state, action: PayloadAction<number>) => {
      const jobIndex = state.jobList.findIndex((job) => job.id === action.payload);
      if (jobIndex !== -1) {
        state.jobList[jobIndex] = {
          ...state.jobList[jobIndex],
          applyState: true,
        };
      }
      state.appliedJob = state.jobList.find((job) => job.id === action.payload) || null;
    },
    queueJob: (state, action: PayloadAction<JobListing>) => {
      state.queue = action.payload.id;
    },
    clearQueue: (state) => {
      state.queue = null;
      state.appliedJob = null;
    },
    setJustLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.justLoggedIn = action.payload;
      if (!state.queue) {
        const jobIndex = state.jobList.findIndex((job) => job.id === state.queue);
        if (jobIndex !== -1) {
          state.jobList[jobIndex] = {
            ...state.jobList[jobIndex],
            applyState: true,
          };
        }
      }
    },
    userLogout: (state) => {
      state.justLoggedIn = false;
      state.queue = null;
      state.jobList = state.jobList.map((job) => ({
        ...job,
        applyState: false,
      }));
      state.appliedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch jobs';
      });
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, jobSlice.reducer);

export const { applyJob, queueJob, clearQueue, setJustLoggedIn, userLogout } = jobSlice.actions;

const store = configureStore({
  reducer: {
    jobSlice: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(thunk, logger),
});

export const persistor = persistStore(store);

export default store;
