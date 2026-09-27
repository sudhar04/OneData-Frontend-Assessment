import { ApplicationStats } from "./ApplicationStats";
import { JobList } from "../jobs/JobList";

export function Dashboard() {
  return (
    <main className="dashboard-page">
      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            JOB PORTAL
          </p>

          <h1>
            Welcome to your
            <span> Job Dashboard</span>
          </h1>

          <p className="dashboard-description">
            Manage your applications, track your progress,
            and discover your next career opportunity.
          </p>
        </div>
      </section>

      {/* Application Statistics */}
      <ApplicationStats />

      {/* Available Jobs */}
      <section className="dashboard-jobs-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Find Your Next Job</h2>

            <p>
              Discover opportunities that match your skills.
            </p>
          </div>
        </div>

        <JobList />
      </section>
    </main>
  );
}