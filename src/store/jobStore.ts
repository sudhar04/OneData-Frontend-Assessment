import { create } from "zustand";
import { jobs } from "../data/jobs";
import type { Job } from "../types/job";

interface JobStore {
  jobs: Job[];
  appliedJobIds: string[];

  applyToJob: (jobId: string) => void;
  isJobApplied: (jobId: string) => boolean;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs,

  appliedJobIds: [],

  applyToJob: (jobId) => {
    set((state) => ({
      appliedJobIds: [...state.appliedJobIds, jobId],
    }));
  },

  isJobApplied: (jobId) => {
    return get().appliedJobIds.includes(jobId);
  },
}));