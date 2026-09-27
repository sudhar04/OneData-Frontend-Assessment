import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { ApplicationData } from "../types/application";

export interface JobApplication extends ApplicationData {
  id: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
}

interface ApplicationStore {
  applications: JobApplication[];

  addApplication: (
    application: ApplicationData,
    jobTitle: string,
    company: string
  ) => void;

  removeApplication: (id: string) => void;

  clearApplications: () => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      applications: [],

      addApplication: (application, jobTitle, company) => {
        const newApplication: JobApplication = {
          ...application,
          id: crypto.randomUUID(),
          jobTitle,
          company,
          appliedAt: new Date().toISOString(),
        };

        set((state) => ({
          applications: [...state.applications, newApplication],
        }));
      },

      removeApplication: (id) => {
        set((state) => ({
          applications: state.applications.filter(
            (application) => application.id !== id
          ),
        }));
      },

      clearApplications: () => {
        set({
          applications: [],
        });
      },
    }),
    {
      name: "job-portal-applications",
    }
  )
);