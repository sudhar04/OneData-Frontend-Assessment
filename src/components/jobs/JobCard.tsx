import { useState } from "react";
import { Button } from "@fluentui/react-components";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import {
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

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

  /* ======================================================
     TANSTACK ROUTER
  ====================================================== */

  const navigate = useNavigate({
    from: "/",
  });

  const searchParams = useSearch({
    from: "/",
  });

  const selectedJobId = searchParams.job;

  const isJobDetailsOpen =
    selectedJobId === String(job.id);

  /* ======================================================
     JOB STORE
  ====================================================== */

  const appliedJobIds = useJobStore(
    (state) => state.appliedJobIds
  );

  const markJobAsApplied = useJobStore(
    (state) => state.markJobAsApplied
  );

  /* ======================================================
     APPLICATION STORE
  ====================================================== */

  const applications = useApplicationStore(
    (state) => state.applications
  );

  /* ======================================================
     APPLICATION STATUS
  ====================================================== */

  const isApplied = appliedJobIds.includes(job.id);

  const application = applications.find(
    (item) =>
      item.jobTitle === job.title &&
      item.company === job.company
  );

  /* ======================================================
     OPEN JOB DETAILS
  ====================================================== */

  const handleOpenJobDetails = () => {
    navigate({
      search: (previous) => ({
        ...previous,
        job: String(job.id),
      }),
    });
  };

  /* ======================================================
     CLOSE JOB DETAILS
  ====================================================== */

  const handleCloseJobDetails = () => {
    navigate({
      search: (previous) => ({
        ...previous,
        job: undefined,
      }),
    });
  };

  /* ======================================================
     APPLY / VIEW APPLICATION
  ====================================================== */

  const handleApply = () => {
    if (isApplied) {
      setDetailsOpen(true);
      return;
    }

    setApplicationOpen(true);
  };

  /* ======================================================
     APPLICATION SUBMITTED
  ====================================================== */

  const handleApplicationSubmit = () => {
    markJobAsApplied(job.id);

    setApplicationOpen(false);
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <>
      {/* ==================================================
          JOB CARD
      ================================================== */}

      <article
        className={`job-card ${
          isApplied ? "job-card-applied" : ""
        }`}
      >
        <div className="job-card-content">

          {/* ================================================
              COMPANY LOGO
          ================================================ */}

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

            {/* Image error fallback */}

            {job.logo && (
              <span className="company-logo-fallback logo-error-fallback">
                {job.company
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </div>

          {/* ================================================
              JOB INFORMATION
          ================================================ */}

          <div className="job-information">

            {/* Job title */}

            <button
              type="button"
              className="job-title job-title-button"
              onClick={handleOpenJobDetails}
            >
              {job.title}
            </button>

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

            {/* Skills */}

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

          {/* ================================================
              ACTIONS
          ================================================ */}

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

      {/* ==================================================
          JOB DETAILS MODAL
      ================================================== */}

      {isJobDetailsOpen && (
        <div
          className="job-details-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="job-details-title"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              handleCloseJobDetails();
            }
          }}
        >
          <div className="job-details-modal">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="job-details-modal-header">
              <h2 id="job-details-title">
                Job Details
              </h2>

              <button
                type="button"
                className="job-details-close-button"
                onClick={handleCloseJobDetails}
                aria-label="Close job details"
              >
                ×
              </button>
            </div>

            {/* ==========================================
                CONTENT
            ========================================== */}

            <div className="job-details-modal-content">

              {/* Company */}

              <div className="job-details-company">

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

                  {job.logo && (
                    <span className="company-logo-fallback logo-error-fallback">
                      {job.company
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="job-details-company-info">
                  <h3>
                    {job.title}
                  </h3>

                  <p>
                    {job.company}
                  </p>
                </div>
              </div>

              {/* Experience */}

              <section className="job-details-section">
                <h4>
                  Experience Required
                </h4>

                <p>
                  {job.experience === 0
                    ? "Fresher"
                    : `${job.experience} ${
                        job.experience === 1
                          ? "year"
                          : "years"
                      } experience`}
                </p>
              </section>

              {/* Skills */}

              {job.skills &&
                job.skills.length > 0 && (
                  <section className="job-details-section">
                    <h4>
                      Skills Required
                    </h4>

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
                  </section>
                )}

              {/* Description */}

              <section className="job-details-section">
                <h4>
                  Job Description
                </h4>

                <p>
                  {job.description}
                </p>
              </section>
            </div>

            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="job-details-modal-actions">

              <Button
                appearance="secondary"
                onClick={handleCloseJobDetails}
              >
                Close
              </Button>

              <Button
                appearance={
                  isApplied
                    ? "secondary"
                    : "primary"
                }
                onClick={() => {
                  handleCloseJobDetails();
                  handleApply();
                }}
              >
                {isApplied
                  ? "View Application"
                  : "Apply Now"}
              </Button>

            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          APPLICATION MODAL
      ================================================== */}

      <ApplicationModal
        open={applicationOpen}
        onClose={() =>
          setApplicationOpen(false)
        }
        jobTitle={job.title}
        company={job.company}
        onSubmit={
          handleApplicationSubmit
        }
      />

      {/* ==================================================
          APPLICATION DETAILS MODAL
      ================================================== */}

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