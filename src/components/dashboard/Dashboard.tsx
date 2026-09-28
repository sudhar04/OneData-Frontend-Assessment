import {
  ArrowRight,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

import { ApplicationStats } from "./ApplicationStats";
import { JobList } from "../jobs/JobList";

export function Dashboard() {
  return (
    <main className="dashboard-page">

      {/* =========================================
          DASHBOARD HERO
      ========================================== */}
      <section className="dashboard-hero">

        <div className="dashboard-hero-left">

          <div className="dashboard-eyebrow">
            <Sparkles size={14} />
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


        {/* =====================================
            HERO SUMMARY
        ====================================== */}
        <div className="dashboard-hero-right">

          <div className="hero-summary-card">

            <div className="hero-summary-icon">
              <BriefcaseBusiness size={21} />
            </div>

            <div className="hero-summary-content">
              <span>APPLICATION TRACKER</span>

              <strong>Stay on top of your job search</strong>

              <p>
                Track every application from one place.
              </p>
            </div>

          </div>


          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

        </div>

      </section>


      {/* =========================================
          APPLICATION STATISTICS
      ========================================== */}
      <ApplicationStats />


      {/* =========================================
          JOB OPPORTUNITIES
      ========================================== */}
      <section
        id="job-opportunities"
        className="dashboard-jobs-section"
      >

        <div className="dashboard-section-header">

          <div>
            <span className="dashboard-section-eyebrow">
              JOB OPPORTUNITIES
            </span>

            <h2>Find Your Next Job</h2>

            <p>
              Discover opportunities that match your
              skills and experience.
            </p>
          </div>

        </div>

        <JobList />

      </section>

    </main>
  );
}