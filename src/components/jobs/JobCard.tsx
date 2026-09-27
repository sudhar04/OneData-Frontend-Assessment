import { useState } from "react";
import { Button } from "@fluentui/react-components";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import type { Job } from "../../types/job";
import { useJobStore } from "../../store/jobStore";
import { useApplicationStore } from "../../store/applicationStore";

import { ApplicationModal } from "../application/ApplicationModal";
import { ApplicationDetailsModal } from "../application/ApplicationDetailsModal";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [applicationOpen, setApplicationOpen] =
    useState(false);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  /*
   * --------------------------------------------------
   * Job application status
   * --------------------------------------------------
   */

  const appliedJobIds = useJobStore(
    (state) => state.appliedJobIds
  );

  const markJobAsApplied = useJobStore(
    (state) => state.markJobAsApplied
  );

  /*
   * --------------------------------------------------
   * Saved applications
   * --------------------------------------------------
   */

  const applications = useApplicationStore(
    (state) => state.applications
  );

  /*
   * --------------------------------------------------
   * Check whether this job has already been applied
   * --------------------------------------------------
   */

  const isApplied = appliedJobIds.includes(job.id);

  /*
   * Find the corresponding application
   */

  const application = applications.find(
    (item) =>
      item.jobTitle === job.title &&
      item.company === job.company
  );

  /*
   * --------------------------------------------------
   * Apply / View Application
   * --------------------------------------------------
   */

  const handleApply = () => {
    if (isApplied) {
      setDetailsOpen(true);
      return;
    }

    setApplicationOpen(true);
  };

  /*
   * --------------------------------------------------
   * Application submitted
   * --------------------------------------------------
   */

  const handleApplicationSubmit = () => {
    markJobAsApplied(job.id);

    setApplicationOpen(false);
  };

  /*
   * --------------------------------------------------
   * Render
   * --------------------------------------------------
   */

  return (
    <>
      <article
        className={`job-card ${
          isApplied ? "job-card-applied" : ""
        }`}
      >
        <div className="job-card-content">

          {/* ==========================================
              COMPANY LOGO
              ========================================== */}

          <div className="company-logo-wrapper">
            {job.logo ? (
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="company-logo"
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";

                  const parent =
                    event.currentTarget.parentElement;

                  if (parent) {
                    parent.classList.add(
                      "logo-image-error"
                    );
                  }
                }}
              />
            ) : (
              <span className="company-logo-fallback">
                {job.company
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}

            {/* Fallback if image fails */}
            {job.logo && (
              <span className="company-logo-fallback logo-error-fallback">
                {job.company
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </div>

          {/* ==========================================
              JOB INFORMATION
              ========================================== */}

          <div className="job-information">

            {/* Job title */}

            <h3 className="job-title">
              {job.title}
            </h3>

            {/* Company */}

            <div className="company-name">
              {job.company}
            </div>

            {/* Experience */}

            <div className="experience">
              {job.experience === 0
                ? "Fresher"
                : `${job.experience} ${
                    job.experience === 1
                      ? "year"
                      : "years"
                  } experience`}
            </div>

            {/* Description */}

            <p className="job-description">
              {job.description}
            </p>

            {/* ========================================
                SKILLS
                ======================================== */}

            {job.skills &&
              job.skills.length > 0 && (
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

          {/* ==========================================
              ACTIONS
              ========================================== */}

          <div className="job-actions">

            <Button
              appearance={
                isApplied
                  ? "secondary"
                  : "primary"
              }
              size="medium"
              icon={
                isApplied ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <ArrowRight size={16} />
                )
              }
              iconPosition="after"
              onClick={handleApply}
            >
              {isApplied
                ? "View Application"
                : "Apply Now"}
            </Button>

          </div>
        </div>
      </article>

      {/* ==============================================
          APPLICATION MODAL
          ============================================== */}

      <ApplicationModal
        open={applicationOpen}
        onClose={() =>
          setApplicationOpen(false)
        }
        jobTitle={job.title}
        company={job.company}
        onSubmit={handleApplicationSubmit}
      />

      {/* ==============================================
          APPLICATION DETAILS MODAL
          ============================================== */}

      {application && (
        <ApplicationDetailsModal
          open={detailsOpen}
          onClose={() =>
            setDetailsOpen(false)
          }
          application={application}
        />
      )}
    </>
  );
}