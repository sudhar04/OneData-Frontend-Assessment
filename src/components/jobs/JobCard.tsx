import { useState } from "react";
import { Button } from "@fluentui/react-components";

import type { Job } from "../../types/job";
import { useJobStore } from "../../store/jobStore";
import { useApplicationStore } from "../../store/applicationStore";

import { ApplicationModal } from "../application/ApplicationModal";
import { ApplicationDetailsModal } from "../application/ApplicationDetailsModal";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  /*
   * Job application status
   */
  const appliedJobIds = useJobStore(
    (state) => state.appliedJobIds
  );

  const markJobAsApplied = useJobStore(
    (state) => state.markJobAsApplied
  );

  /*
   * Saved applications
   */
  const applications = useApplicationStore(
    (state) => state.applications
  );

  const isApplied = appliedJobIds.includes(job.id);

  const application = applications.find(
    (item) => item.jobTitle === job.title && item.company === job.company
  );

  const handleApply = () => {
    if (isApplied) {
      setDetailsOpen(true);
      return;
    }

    setApplicationOpen(true);
  };

  const handleApplicationSubmit = () => {
    markJobAsApplied(job.id);
  };

  return (
    <>
      <article className="job-card">
        <div className="job-card-content">

          {/* Company Logo */}
          <div className="company-logo-wrapper">
            {job.logo ? (
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="company-logo"
              />
            ) : (
              <span className="company-logo-fallback">
                {job.company.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Job Information */}
          <div className="job-information">

            <h3 className="job-title">
              {job.title}
            </h3>

            <div className="company-name">
              {job.company}
            </div>

            <div className="experience">
              {job.experience === 0
                ? "Fresher"
                : `${job.experience} ${
                    job.experience === 1 ? "year" : "years"
                  } experience`}
            </div>

            <p className="job-description">
              {job.description}
            </p>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className="skill-tags">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="job-skill-tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="job-actions">

            <Button
              appearance={isApplied ? "secondary" : "primary"}
              onClick={handleApply}
            >
              {isApplied
                ? "View Application"
                : "Apply Now"}
            </Button>

          </div>
        </div>
      </article>

      {/* Application Modal */}
      <ApplicationModal
        open={applicationOpen}
        onClose={() => setApplicationOpen(false)}
        jobTitle={job.title}
        company={job.company}
        onSubmit={handleApplicationSubmit}
      />

      {/* Application Details */}
      {application && (
        <ApplicationDetailsModal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          application={application}
        />
      )}
    </>
  );
}