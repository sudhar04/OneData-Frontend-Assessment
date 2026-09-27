import { createFileRoute } from "@tanstack/react-router";
import { JobList } from "../components/jobs/JobList";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <JobList />;
}