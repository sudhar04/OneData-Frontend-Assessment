import { create } from "zustand";

import { jobs as initialJobs } from "../data/jobs";
import type { Job } from "../types/job";

interface JobStore {
  jobs: Job[];
  appliedJobIds: string[];

  markJobAsApplied: (jobId: string) => void;
  isJobApplied: (jobId: string) => boolean;
  resetAppliedJobs: () => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
  // Always initialize these as arrays.
  // This prevents undefined.filter / undefined.includes errors.
  jobs: Array.isArray(initialJobs) ? initialJobs : [],
  appliedJobIds: [],

  markJobAsApplied: (jobId: string) => {
    if (!jobId) {
      return;
    }

    set((state) => {
      // Do not add the same job twice.
      if (state.appliedJobIds.includes(jobId)) {
        return state;
      }

      return {
        appliedJobIds: [...state.appliedJobIds, jobId],
      };
    });
  },

  isJobApplied: (jobId: string) => {
    return get().appliedJobIds.includes(jobId);
  },

  resetAppliedJobs: () => {
    set({
      appliedJobIds: [],
    });
  },
}));