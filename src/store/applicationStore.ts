import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import type { ApplicationData } from "../types/application";

/* =========================================================
   Application Status
========================================================= */

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Interview"
  | "Selected"
  | "Rejected";

/* =========================================================
   Job Application
========================================================= */

export interface JobApplication
  extends ApplicationData {
  id: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: ApplicationStatus;
}

/* =========================================================
   Application Store
========================================================= */

interface ApplicationStore {
  applications: JobApplication[];

  addApplication: (
    application: ApplicationData,
    jobTitle: string,
    company: string
  ) => void;

  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus
  ) => void;

  removeApplication: (id: string) => void;

  clearApplications: () => void;
}

/* =========================================================
   Zustand Store
========================================================= */

export const useApplicationStore =
  create<ApplicationStore>()(
    persist(
      (set) => ({
        /* ===============================================
           Initial State
        =============================================== */

        applications: [],

        /* ===============================================
           Add Application
        =============================================== */

        addApplication: (
          application,
          jobTitle,
          company
        ) => {
          const newApplication: JobApplication = {
            ...application,

            id: crypto.randomUUID(),

            jobTitle,

            company,

            appliedAt:
              new Date().toISOString(),

            status: "Applied",
          };

          set((state) => ({
            applications: [
              ...state.applications,
              newApplication,
            ],
          }));
        },

        /* ===============================================
           Update Application Status
        =============================================== */

        updateApplicationStatus: (
          id,
          status
        ) => {
          set((state) => ({
            applications:
              state.applications.map(
                (application) =>
                  application.id === id
                    ? {
                        ...application,
                        status,
                      }
                    : application
              ),
          }));
        },

        /* ===============================================
           Remove Application
        =============================================== */

        removeApplication: (id) => {
          set((state) => ({
            applications:
              state.applications.filter(
                (application) =>
                  application.id !== id
              ),
          }));
        },

        /* ===============================================
           Clear All Applications
        =============================================== */

        clearApplications: () => {
          set({
            applications: [],
          });
        },
      }),

      /* ===============================================
         Persistence
      =============================================== */

      {
        name: "job-portal-applications",

        storage:
          createJSONStorage(
            () => localStorage
          ),

        /* =============================================
           Handle Older Stored Applications
        ============================================= */

        migrate: (persistedState) => {
          const state =
            persistedState as ApplicationStore;

          if (!state?.applications) {
            return state;
          }

          return {
            ...state,

            applications:
              state.applications.map(
                (application) => ({
                  ...application,

                  status:
                    application.status ??
                    "Applied",
                })
              ),
          };
        },

        version: 1,
      }
    )
  );