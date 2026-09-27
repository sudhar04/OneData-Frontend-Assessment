import { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Text,
} from "@fluentui/react-components";

import {
  Eye,
  Trash2,
  Trash,
} from "lucide-react";

import {
  useApplicationStore,
} from "../../store/applicationStore";

import type {
  JobApplication,
  ApplicationStatus,
} from "../../store/applicationStore";

interface ApplicationListProps {
  onViewApplication: (
    application: JobApplication
  ) => void;
}

export function ApplicationList({
  onViewApplication,
}: ApplicationListProps) {
  // -----------------------------------------
  // Zustand Store
  // -----------------------------------------

  const applications = useApplicationStore(
    (state) => state.applications
  );

  const removeApplication = useApplicationStore(
    (state) => state.removeApplication
  );

  const clearApplications = useApplicationStore(
    (state) => state.clearApplications
  );

  const updateApplicationStatus =
    useApplicationStore(
      (state) =>
        state.updateApplicationStatus
    );

  // -----------------------------------------
  // Dialog State
  // -----------------------------------------

  const [
    applicationToRemove,
    setApplicationToRemove,
  ] = useState<JobApplication | null>(null);

  const [clearDialogOpen, setClearDialogOpen] =
    useState(false);

  // -----------------------------------------
  // Format Date
  // -----------------------------------------

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // -----------------------------------------
  // Remove Application
  // -----------------------------------------

  const handleConfirmRemove = () => {
    if (!applicationToRemove) {
      return;
    }

    removeApplication(
      applicationToRemove.id
    );

    setApplicationToRemove(null);
  };

  // -----------------------------------------
  // Clear All Applications
  // -----------------------------------------

  const handleConfirmClearAll = () => {
    clearApplications();

    setClearDialogOpen(false);
  };

  // -----------------------------------------
  // Status Change
  // -----------------------------------------

  const handleStatusChange = (
    applicationId: string,
    status: ApplicationStatus
  ) => {
    updateApplicationStatus(
      applicationId,
      status
    );
  };

  // -----------------------------------------
  // Empty State
  // -----------------------------------------

  if (applications.length === 0) {
    return (
      <section className="applications-section">
        <div className="applications-header">
          <div>
            <Text
              size={600}
              weight="bold"
              block
            >
              My Applications
            </Text>

            <Text
              size={300}
              block
              className="applications-subtitle"
            >
              Your submitted job applications
              will appear here.
            </Text>
          </div>
        </div>

        <div className="applications-empty">
          <Text
            size={500}
            weight="semibold"
            block
          >
            No applications yet
          </Text>

          <Text
            size={300}
            block
          >
            Apply for a job to see your
            application here.
          </Text>
        </div>
      </section>
    );
  }

  // -----------------------------------------
  // Applications
  // -----------------------------------------

  return (
    <section className="applications-section">

      {/* ------------------------------------- */}
      {/* Header                                */}
      {/* ------------------------------------- */}

      <div className="applications-header">
        <div>
          <Text
            size={600}
            weight="bold"
            block
          >
            My Applications
          </Text>

          <Text
            size={300}
            block
            className="applications-subtitle"
          >
            {applications.length}{" "}
            {applications.length === 1
              ? "application"
              : "applications"}{" "}
            submitted
          </Text>
        </div>

        <Button
          appearance="secondary"
          icon={<Trash size={16} />}
          onClick={() =>
            setClearDialogOpen(true)
          }
        >
          Clear All
        </Button>
      </div>

      {/* ------------------------------------- */}
      {/* Application Cards                     */}
      {/* ------------------------------------- */}

      <div className="applications-list">
        {applications.map((application) => (
          <Card
            key={application.id}
            className="application-card"
          >
            {/* -------------------------------- */}
            {/* Card Header                      */}
            {/* -------------------------------- */}

            <CardHeader
              header={
                <div className="application-card-header">
                  <div>
                    <Text
                      size={500}
                      weight="semibold"
                      block
                    >
                      {application.jobTitle}
                    </Text>

                    <Text
                      size={300}
                      block
                    >
                      {application.company}
                    </Text>
                  </div>

                  {/* Status Badge */}

                  <span
                    className={`application-status status-${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </span>
                </div>
              }
            />

            {/* -------------------------------- */}
            {/* Card Content                     */}
            {/* -------------------------------- */}

            <div className="application-card-content">

              {/* Application Date */}

              <div className="application-meta">
                <span>
                  Applied on
                </span>

                <strong>
                  {formatDate(
                    application.appliedAt
                  )}
                </strong>
              </div>

              {/* Status Selector */}

              <div className="application-status-control">
                <label
                  htmlFor={`status-${application.id}`}
                >
                  Status
                </label>

                <select
                  id={`status-${application.id}`}
                  value={application.status}
                  onChange={(event) =>
                    handleStatusChange(
                      application.id,
                      event.target
                        .value as ApplicationStatus
                    )
                  }
                >
                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Interview">
                    Interview
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                  <option value="Offer">
                    Offer
                  </option>
                </select>
              </div>

              {/* Action Buttons */}

              <div className="application-actions">

                <Button
                  appearance="secondary"
                  icon={<Eye size={16} />}
                  onClick={() =>
                    onViewApplication(
                      application
                    )
                  }
                >
                  View Application
                </Button>

                <Button
                  appearance="secondary"
                  icon={<Trash2 size={16} />}
                  onClick={() =>
                    setApplicationToRemove(
                      application
                    )
                  }
                >
                  Remove
                </Button>

              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ===================================== */}
      {/* Remove Confirmation Dialog             */}
      {/* ===================================== */}

      <Dialog
        open={Boolean(
          applicationToRemove
        )}
        onOpenChange={(_, data) => {
          if (!data.open) {
            setApplicationToRemove(null);
          }
        }}
      >
        <DialogSurface>
          <DialogBody>

            <DialogTitle>
              Remove Application
            </DialogTitle>

            <DialogContent>

              <Text block>
                Are you sure you want to
                remove this application?
              </Text>

              {applicationToRemove && (
                <div className="remove-application-preview">

                  <Text
                    weight="semibold"
                    block
                  >
                    {
                      applicationToRemove.jobTitle
                    }
                  </Text>

                  <Text
                    size={300}
                    block
                  >
                    {
                      applicationToRemove.company
                    }
                  </Text>

                </div>
              )}

            </DialogContent>

            <DialogActions>

              <Button
                appearance="secondary"
                onClick={() =>
                  setApplicationToRemove(
                    null
                  )
                }
              >
                Cancel
              </Button>

              <Button
                appearance="primary"
                onClick={
                  handleConfirmRemove
                }
              >
                Remove
              </Button>

            </DialogActions>

          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* ===================================== */}
      {/* Clear All Confirmation Dialog          */}
      {/* ===================================== */}

      <Dialog
        open={clearDialogOpen}
        onOpenChange={(_, data) => {
          setClearDialogOpen(data.open);
        }}
      >
        <DialogSurface>
          <DialogBody>

            <DialogTitle>
              Clear All Applications
            </DialogTitle>

            <DialogContent>

              <Text block>
                Are you sure you want to
                remove all of your submitted
                applications?
              </Text>

              <Text
                size={300}
                block
                style={{
                  marginTop: "8px",
                }}
              >
                This action cannot be undone.
              </Text>

            </DialogContent>

            <DialogActions>

              <Button
                appearance="secondary"
                onClick={() =>
                  setClearDialogOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                appearance="primary"
                onClick={
                  handleConfirmClearAll
                }
              >
                Clear All
              </Button>

            </DialogActions>

          </DialogBody>
        </DialogSurface>
      </Dialog>

    </section>
  );
}