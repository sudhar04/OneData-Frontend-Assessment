import { useMemo, useState } from "react";

import { useJobStore } from "../../store/jobStore";
import { JobCard } from "./JobCard";

export function JobList() {
  const jobs = useJobStore((state) => state.jobs);

  const [searchTerm, setSearchTerm] = useState("");

  /*
   * Safety:
   * Even if the store is temporarily empty/undefined during
   * development changes, the component always works with an array.
   */
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const filteredJobs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return safeJobs;
    }

    return safeJobs.filter((job) => {
      const title = String(job.title ?? "").toLowerCase();
      const company = String(job.company ?? "").toLowerCase();

      return (
        title.includes(search) ||
        company.includes(search)
      );
    });
  }, [safeJobs, searchTerm]);

  return (
    <section className="job-page">
      {/* Header */}
      <div className="job-header">
        <div>
          <h1>Find Your Next Job</h1>

          <p>
            Discover opportunities that match your skills.
          </p>
        </div>

        <div className="job-search">
          <input
            type="search"
            value={searchTerm}
            placeholder="Search jobs by title or company..."
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            aria-label="Search jobs"
          />
        </div>
      </div>

      {/* Job list */}
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
            <h3>No jobs found</h3>

            <p>
              Try searching for a different job title or company.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}