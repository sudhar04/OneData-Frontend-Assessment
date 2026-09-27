import {
  Input,
  Text,
  Title3,
} from "@fluentui/react-components";

import { useState } from "react";
import { useJobStore } from "../../store/jobStore";
import { JobCard } from "./JobCard";

export function JobList() {
  const jobs = useJobStore((state) => state.jobs);

  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="job-page">
      <div className="job-header">
        <div>
          <Title3>Find Your Next Job</Title3>

          <Text>
            Discover opportunities that match your skills.
          </Text>
        </div>

        <Input
          className="job-search"
          placeholder="Search jobs by title or company..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="empty-state">
            <Text size={500} weight="semibold">
              No jobs found
            </Text>

            <Text>
              Try searching for another job title or company.
            </Text>
          </div>
        )}
      </div>
    </main>
  );
}