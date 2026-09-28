import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ApplicationStats } from "../components/dashboard/ApplicationStats";
import { ApplicationList } from "../components/application/ApplicationList";
import { ApplicationDetailsModal } from "../components/application/ApplicationDetailsModal";
import { JobList } from "../components/jobs/JobList";

import type { JobApplication } from "../store/applicationStore";

/* =========================================================
   URL SEARCH PARAMETERS
========================================================= */

type SearchParams = {
  search?: string;
  job?: string;
  application?: string;
};

/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/")({
  validateSearch: (search): SearchParams => ({
    search:
      typeof search.search === "string"
        ? search.search
        : undefined,

    job:
      typeof search.job === "string"
        ? search.job
        : undefined,

    application:
      typeof search.application === "string"
        ? search.application
        : undefined,
  }),

  component: HomePage,
});

/* =========================================================
   HOME PAGE
========================================================= */

function HomePage() {
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  /* =======================================================
     VIEW APPLICATION
  ======================================================= */

  const handleViewApplication = (
    application: JobApplication
  ) => {
    setSelectedApplication(application);
    setDetailsOpen(true);
  };

  /* =======================================================
     CLOSE APPLICATION DETAILS
  ======================================================= */

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedApplication(null);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="home-page">

      {/* =========================================
          HERO / WELCOME
      ========================================= */}

      <section className="dashboard-hero">
        <div className="dashboard-hero-content">

          <span className="dashboard-eyebrow">
            JOB PORTAL
          </span>

          <h1>
            Welcome to Your Job Dashboard
          </h1>

          <p>
            Discover opportunities, track applications,
            and manage your job search in one place.
          </p>

        </div>
      </section>

      {/* =========================================
          APPLICATION STATISTICS
      ========================================= */}

      <section className="dashboard-section">
        <ApplicationStats />
      </section>

      {/* =========================================
          AVAILABLE JOBS
      ========================================= */}

      <section className="dashboard-section">
        <JobList />
      </section>

      {/* =========================================
          MY APPLICATIONS
      ========================================= */}

      <section className="dashboard-section">
        <ApplicationList
          onViewApplication={handleViewApplication}
        />
      </section>

      {/* =========================================
          APPLICATION DETAILS MODAL
      ========================================= */}

      <ApplicationDetailsModal
        open={detailsOpen}
        application={selectedApplication}
        onClose={handleCloseDetails}
      />

    </main>
  );
}