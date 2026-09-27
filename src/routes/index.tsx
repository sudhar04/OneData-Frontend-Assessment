import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ApplicationStats } from "../components/dashboard/ApplicationStats";
import { ApplicationList } from "../components/application/ApplicationList";
import { ApplicationDetailsModal } from "../components/application/ApplicationDetailsModal";
import { JobList } from "../components/jobs/JobList";

import type { JobApplication } from "../store/applicationStore";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewApplication = (
    application: JobApplication
  ) => {
    setSelectedApplication(application);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedApplication(null);
  };

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