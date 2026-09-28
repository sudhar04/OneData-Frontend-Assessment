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

  /* =========================================================
     Calculate Application Statistics
  ========================================================= */

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

  /* =========================================================
     Statistics Configuration
  ========================================================= */

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      description: "Jobs you've applied to",
      icon: BriefcaseBusiness,
      cardClass: "stats-card-blue",
    },

    {
      label: "Under Review",
      value: underReview,
      description: "Applications being reviewed",
      icon: Clock3,
      cardClass: "stats-card-orange",
    },

    {
      label: "Interviews",
      value: interviews,
      description: "Interview opportunities",
      icon: MessageSquare,
      cardClass: "stats-card-purple",
    },

    {
      label: "Selected",
      value: selected,
      description: "Successful applications",
      icon: CheckCircle2,
      cardClass: "stats-card-green",
    },

    {
      label: "Rejected",
      value: rejected,
      description: "Applications not selected",
      icon: XCircle,
      cardClass: "stats-card-red",
    },
  ];

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="application-stats">

      {/* =====================================================
          Header
      ===================================================== */}

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

      {/* =====================================================
          Statistics Cards
      ===================================================== */}

      <div className="application-stats-grid">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`application-stat-card ${stat.cardClass}`}
            >

              {/* Top section */}

              <div className="application-stat-top">

                <div className="application-stat-icon">
                  <Icon
                    size={19}
                    strokeWidth={2}
                  />
                </div>

                <span className="application-stat-arrow">
                  ↗
                </span>

              </div>

              {/* Content */}

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