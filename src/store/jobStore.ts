import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import { jobs as initialJobs } from "../data/jobs";
import type { Job } from "../types/job";

interface JobStore {
  jobs: Job[];
  appliedJobIds: string[];

  markJobAsApplied: (jobId: string) => void;
  isJobApplied: (jobId: string) => boolean;
  resetAppliedJobs: () => void;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      /* =========================================
         Jobs
      ========================================= */

      jobs: Array.isArray(initialJobs)
        ? initialJobs
        : [],

      /* =========================================
         Applied Job IDs
      ========================================= */

      appliedJobIds: [],

      /* =========================================
         Mark Job As Applied
      ========================================= */

      markJobAsApplied: (jobId: string) => {
        if (!jobId) {
          return;
        }

        set((state) => {
          // Prevent duplicate application
          if (state.appliedJobIds.includes(jobId)) {
            return state;
          }

          return {
            appliedJobIds: [
              ...state.appliedJobIds,
              jobId,
            ],
          };
        });
      },

      /* =========================================
         Check If Job Is Applied
      ========================================= */

      isJobApplied: (jobId: string) => {
        return get().appliedJobIds.includes(jobId);
      },

      /* =========================================
         Reset Applied Jobs
      ========================================= */

      resetAppliedJobs: () => {
        set({
          appliedJobIds: [],
        });
      },
    }),

    /* =========================================
       Persistence
    ========================================= */

    {
      name: "job-portal-jobs",

      storage: createJSONStorage(
        () => localStorage
      ),

      version: 1,
    }
  )
);