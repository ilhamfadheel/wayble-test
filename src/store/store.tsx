import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJobs } from '@/store/jobs';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import logger, { createLogger } from 'redux-logger';

// const API_URL: any = process.env.API_ENDPOINT;

interface JobState {
  jobList: JobListing[];
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
};

const jobSlice = createSlice({
  name: 'appliedJobsSlice',
  initialState,
  reducers: {
    // TODO: can add applyState variable to the jobs.json objects and update the endpoint using axios
    applyJob: (state, action: PayloadAction<number>) => {
      const jobIndex = state.jobList.findIndex((job) => job.id === action.payload);
      if (jobIndex !== -1) {
        state.jobList[jobIndex] = {
          ...state.jobList[jobIndex],
          applyState: true,
        };
      }
    },
    userLogout: (state) => {
      state.jobList = state.jobList.map((job) => ({
        ...job,
        applyState: false,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.jobList = action.payload;
    });
    // Handle other states (pending, rejected) if needed
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const loggerMiddleware = createLogger({
  duration: true,
  diff: false,
});

const persistedReducer = persistReducer(persistConfig, jobSlice.reducer);

export const { applyJob, userLogout } = jobSlice.actions;

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
