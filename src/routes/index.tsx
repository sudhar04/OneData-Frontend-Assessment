import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

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

      {/* =====================================================
          HERO / WELCOME
      ===================================================== */}

      <section className="dashboard-hero">

        <div className="dashboard-hero-left">

          <div className="dashboard-eyebrow">
            <Sparkles size={15} />
            <span>JOB PORTAL</span>
          </div>

          <h1 className="dashboard-title">
            Welcome to your
            <span> Job Dashboard</span>
          </h1>

          <p className="dashboard-description">
            Manage your applications, track your progress,
            and discover your next career opportunity.
          </p>

          <a
            href="#job-opportunities"
            className="dashboard-explore-button"
          >
            <BriefcaseBusiness size={17} />
            Explore Jobs
            <ArrowRight size={16} />
          </a>

        </div>

        {/* =================================================
            RIGHT HERO SUMMARY
        ================================================= */}

        <div className="dashboard-hero-right">

          <div className="hero-summary-card">

            <div className="hero-summary-icon">
              <BriefcaseBusiness size={22} />
            </div>

            <div className="hero-summary-content">

              <span>
                APPLICATION TRACKER
              </span>

              <strong>
                Stay on top of your job search
              </strong>

              <p>
                Track applications, interviews,
                and opportunities from one place.
              </p>

            </div>

          </div>

          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

        </div>

      </section>


      {/* =====================================================
          APPLICATION STATISTICS
      ===================================================== */}

      <section className="dashboard-section">
        <ApplicationStats />
      </section>


      {/* =====================================================
          AVAILABLE JOBS
          
          JobList already contains:
          - Section heading
          - Search
          - Results count
          - Job cards
      ===================================================== */}

      <section
        id="job-opportunities"
        className="dashboard-section dashboard-jobs"
      >
        <JobList />
      </section>


      {/* =====================================================
          MY APPLICATIONS
      ===================================================== */}

      <section className="dashboard-section">

        <ApplicationList
          onViewApplication={handleViewApplication}
        />

      </section>


      {/* =====================================================
          APPLICATION DETAILS MODAL
      ===================================================== */}

      <ApplicationDetailsModal
        open={detailsOpen}
        application={selectedApplication}
        onClose={handleCloseDetails}
      />

    </main>
  );
}