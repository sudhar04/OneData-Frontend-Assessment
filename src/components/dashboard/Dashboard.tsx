import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { ApplicationStats } from "./ApplicationStats";
import { JobList } from "../jobs/JobList";
import { useApplicationStore } from "../../store/applicationStore";

export function Dashboard() {
  const applications = useApplicationStore(
    (state) => state.applications
  );

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) =>
      (application.status ?? "Applied") === "Interview"
  ).length;

  const selected = applications.filter(
    (application) =>
      (application.status ?? "Applied") === "Selected"
  ).length;

  return (
    <main className="jp-dashboard-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="jp-dashboard-hero">

        {/* LEFT SIDE */}
        <div className="jp-hero-content">

          <div className="jp-hero-eyebrow">
            <Sparkles size={15} />
            <span>JOB PORTAL</span>
          </div>

          <h1 className="jp-hero-title">
            Welcome to your
            <span> Job Dashboard</span>
          </h1>

          <p className="jp-hero-description">
            Discover opportunities, track applications,
            and manage your job search in one place.
          </p>

          <a
            href="#job-opportunities"
            className="jp-hero-button"
          >
            <BriefcaseBusiness size={17} />
            <span>Explore Jobs</span>
            <ArrowRight size={16} />
          </a>

        </div>


        {/* RIGHT SIDE */}
        <div className="jp-hero-summary">

          {/* Summary Header */}
          <div className="jp-summary-header">

            <div className="jp-summary-icon">
              <TrendingUp size={21} />
            </div>

            <div>
              <span className="jp-summary-label">
                APPLICATION OVERVIEW
              </span>

              <h3>
                Your job search at a glance
              </h3>
            </div>

          </div>


          {/* Main Number */}
          <div className="jp-summary-main">

            <div>
              <span>Total Applications</span>

              <strong>
                {totalApplications}
              </strong>
            </div>

            <div className="jp-summary-trend">
              <TrendingUp size={15} />
              <span>Tracking</span>
            </div>

          </div>


          {/* Mini Stats */}
          <div className="jp-summary-stats">

            <div className="jp-summary-stat">

              <div className="jp-mini-icon jp-mini-icon-blue">
                <Clock3 size={16} />
              </div>

              <div>
                <strong>{interviews}</strong>
                <span>Interviews</span>
              </div>

            </div>


            <div className="jp-summary-stat">

              <div className="jp-mini-icon jp-mini-icon-green">
                <CheckCircle2 size={16} />
              </div>

              <div>
                <strong>{selected}</strong>
                <span>Selected</span>
              </div>

            </div>

          </div>


          {/* Bottom message */}
          <div className="jp-summary-footer">
            <BriefcaseBusiness size={15} />

            <span>
              Keep applying and stay consistent with your search.
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          APPLICATION STATISTICS
      ===================================================== */}

      <ApplicationStats />


      {/* =====================================================
          JOB OPPORTUNITIES
      ===================================================== */}

      <section
        id="job-opportunities"
        className="jp-jobs-section"
      >

        <div className="jp-jobs-header">

          <div>

            <span className="jp-section-eyebrow">
              JOB OPPORTUNITIES
            </span>

            <h2>
              Find Your Next Job
            </h2>

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