import {
  Badge,
  Button,
  Card,
  Text,
} from "@fluentui/react-components";

import { useJobStore } from "../../store/jobStore";
import type { Job } from "../../types/job";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const appliedJobIds = useJobStore((state) => state.appliedJobIds);

  const isApplied = appliedJobIds.includes(job.id);

  return (
    <Card className="job-card">
      <div className="job-card-content">
        <div className="company-logo-wrapper">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="company-logo"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <span className="company-logo-fallback">
            {job.company.charAt(0)}
          </span>
        </div>

        <div className="job-information">
          <Text size={500} weight="semibold">
            {job.title}
          </Text>

          <Text className="company-name">
            {job.company}
          </Text>

          <Text className="experience">
            {job.experience === 0
              ? "Fresher"
              : `${job.experience} ${
                  job.experience === 1 ? "year" : "years"
                } experience`}
          </Text>

          <Text className="job-description">
            {job.description}
          </Text>

          <div className="skill-tags">
            {job.skills.map((skill) => (
              <Badge key={skill} appearance="tint">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="job-actions">
          {isApplied ? (
            <Badge appearance="filled">
              Applied
            </Badge>
          ) : (
            <Button appearance="primary">
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}