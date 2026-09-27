import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import type { ApplicationData } from "../types/application";

// -----------------------------------------
// Application Status
// -----------------------------------------

export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Rejected"
  | "Offer";

// -----------------------------------------
// Job Application
// -----------------------------------------

export interface JobApplication
  extends ApplicationData {
  id: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: ApplicationStatus;
}

// -----------------------------------------
// Store
// -----------------------------------------

interface ApplicationStore {
  applications: JobApplication[];

  addApplication: (
    application: ApplicationData,
    jobTitle: string,
    company: string
  ) => void;

  removeApplication: (id: string) => void;

  clearApplications: () => void;

  updateApplicationStatus: (
    id: string,
    status: ApplicationStatus
  ) => void;
}

// -----------------------------------------
// Zustand Store
// -----------------------------------------

export const useApplicationStore =
  create<ApplicationStore>()(
    persist(
      (set) => ({
        applications: [],

        // -----------------------------------
        // Add Application
        // -----------------------------------

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

        // -----------------------------------
        // Remove Application
        // -----------------------------------

        removeApplication: (id) => {
          set((state) => ({
            applications:
              state.applications.filter(
                (application) =>
                  application.id !== id
              ),
          }));
        },

        // -----------------------------------
        // Clear Applications
        // -----------------------------------

        clearApplications: () => {
          set({
            applications: [],
          });
        },

        // -----------------------------------
        // Update Status
        // -----------------------------------

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
      }),

      {
        name: "job-portal-applications",

        storage:
          createJSONStorage(
            () => localStorage
          ),
      }
    )
  );