import { Card, Text } from "@fluentui/react-components";
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
      icon: <BriefcaseBusiness size={22} />,
      className: "stat-total",
    },
    {
      label: "Under Review",
      value: underReview,
      icon: <Clock3 size={22} />,
      className: "stat-review",
    },
    {
      label: "Interviews",
      value: interviews,
      icon: <MessageSquare size={22} />,
      className: "stat-interview",
    },
    {
      label: "Selected",
      value: selected,
      icon: <CheckCircle2 size={22} />,
      className: "stat-selected",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: <XCircle size={22} />,
      className: "stat-rejected",
    },
  ];

  return (
    <section className="application-stats">
      <div className="application-stats-header">
        <div>
          <Text size={600} weight="bold" block>
            Application Overview
          </Text>

          <Text
            size={300}
            block
            className="applications-subtitle"
          >
            Track the progress of your job applications.
          </Text>
        </div>
      </div>

      <div className="application-stats-grid">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={`application-stat-card ${stat.className}`}
          >
            <div className="application-stat-icon">
              {stat.icon}
            </div>

            <div className="application-stat-info">
              <Text size={300} block>
                {stat.label}
              </Text>

              <Text size={700} weight="bold" block>
                {stat.value}
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}