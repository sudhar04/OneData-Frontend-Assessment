import {
  BriefcaseBusiness,
  Clock3,
  MessageSquare,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useApplicationStore } from "../../store/applicationStore";

export function ApplicationStats() {
  const applications = useApplicationStore(
    (state) => state.applications
  );

  const totalApplications = applications.length;

  const underReview = applications.filter(
    (application) =>
      (application.status ?? "Applied") === "Under Review"
  ).length;

  const interviews = applications.filter(
    (application) =>
      (application.status ?? "Applied") === "Interview"
  ).length;

  const selected = applications.filter(
    (application) =>
      (application.status ?? "Applied") === "Selected"
  ).length;

  const rejected = applications.filter(
    (application) =>
      (application.status ?? "Applied") === "Rejected"
  ).length;

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      description: "Jobs you've applied to",
      icon: BriefcaseBusiness,
      className: "stat-total",
    },
    {
      label: "Under Review",
      value: underReview,
      description: "Applications being reviewed",
      icon: Clock3,
      className: "stat-review",
    },
    {
      label: "Interviews",
      value: interviews,
      description: "Interview opportunities",
      icon: MessageSquare,
      className: "stat-interview",
    },
    {
      label: "Selected",
      value: selected,
      description: "Successful applications",
      icon: CheckCircle2,
      className: "stat-selected",
    },
    {
      label: "Rejected",
      value: rejected,
      description: "Applications not selected",
      icon: XCircle,
      className: "stat-rejected",
    },
  ];

  return (
    <section className="application-stats">

      {/* Header */}
      <div className="application-stats-header">

        <div>
          <span className="application-stats-eyebrow">
            APPLICATION TRACKER
          </span>

          <h2>
            Application Overview
          </h2>

          <p>
            Track the progress of your job applications in one place.
          </p>
        </div>

      </div>


      {/* Statistics */}
      <div className="application-stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`application-stat-card ${stat.className}`}
            >

              <div className="application-stat-top">

                <div className="application-stat-icon">
                  <Icon size={19} strokeWidth={2} />
                </div>

                <span className="application-stat-arrow">
                  ↗
                </span>

              </div>


              <div className="application-stat-content">

                <span className="application-stat-label">
                  {stat.label}
                </span>

                <strong className="application-stat-value">
                  {stat.value}
                </strong>

                <span className="application-stat-description">
                  {stat.description}
                </span>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}