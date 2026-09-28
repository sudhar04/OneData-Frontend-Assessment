import { useMemo } from "react";
import {
  Input,
} from "@fluentui/react-components";
import {
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

import { useJobStore } from "../../store/jobStore";
import { JobCard } from "./JobCard";

export function JobList() {
  const jobs = useJobStore((state) => state.jobs);

  const navigate = useNavigate({
    from: "/",
  });

  const searchParams = useSearch({
    from: "/",
  });

  /*
   * Search value comes directly from the URL.
   *
   * Example:
   *
   * /?search=react
   *
   * searchParams.search === "react"
   */
  const searchTerm = searchParams.search ?? "";

  /*
   * Safety:
   * Always work with an array.
   */
  const safeJobs = Array.isArray(jobs)
    ? jobs
    : [];

  /*
   * Filter jobs.
   */
  const filteredJobs = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return safeJobs;
    }

    return safeJobs.filter((job) => {
      const title = String(
        job.title ?? ""
      ).toLowerCase();

      const company = String(
        job.company ?? ""
      ).toLowerCase();

      return (
        title.includes(search) ||
        company.includes(search)
      );
    });
  }, [safeJobs, searchTerm]);

  /*
   * Update search parameter in URL.
   */
  const handleSearchChange = (
    value: string
  ) => {
    navigate({
      search: (previous) => ({
        ...previous,

        search:
          value.trim().length > 0
            ? value
            : undefined,
      }),

      replace: true,
    });
  };

  return (
    <section className="job-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="job-header">

        <div>
          <span className="dashboard-eyebrow">
            JOB OPPORTUNITIES
          </span>

          <h1>
            Find Your Next Job
          </h1>

          <p>
            Discover opportunities that match
            your skills and experience.
          </p>
        </div>

        {/* =====================================
            SEARCH
        ====================================== */}

        <div className="job-search">

          <Input
            type="search"
            value={searchTerm}
            placeholder="Search by job title or company..."
            aria-label="Search jobs by title or company"
            size="large"
            appearance="outline"
            onChange={(event) => {
              handleSearchChange(
                event.target.value
              );
            }}
          />

        </div>

      </div>

      {/* =========================================
          RESULTS INFORMATION
      ========================================= */}

      <div className="job-results-info">

        <p>
          {filteredJobs.length}{" "}
          {filteredJobs.length === 1
            ? "job"
            : "jobs"}{" "}
          found
        </p>

        {searchTerm.trim() && (
          <p>
            Showing results for{" "}
            <strong>
              "{searchTerm.trim()}"
            </strong>
          </p>
        )}

      </div>

      {/* =========================================
          JOB LIST
      ========================================= */}

      <div className="job-list">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))

        ) : (

          <div className="empty-state">

            <h3>
              No jobs found
            </h3>

            <p>
              No jobs match your search.
              Try a different job title
              or company name.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}