import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJobs } from '@/store/jobs';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import logger, { createLogger } from 'redux-logger';

interface JobState {
  jobList: JobListing[];
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
    },
    setJustLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.justLoggedIn = action.payload;
    },
    userLogout: (state) => {
      state.justLoggedIn = false;
      state.jobList = state.jobList.map((job) => ({
        ...job,
        applyState: false,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error state
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

export const { applyJob, setJustLoggedIn, userLogout } = jobSlice.actions;

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
