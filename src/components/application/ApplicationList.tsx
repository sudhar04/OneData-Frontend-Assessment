import { useMemo, useState } from "react";

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
  Input,
  Text,
} from "@fluentui/react-components";

import {
  Eye,
  Search,
  Trash2,
  Trash,
} from "lucide-react";

import { useApplicationStore } from "../../store/applicationStore";

import type {
  JobApplication,
  ApplicationStatus,
} from "../../store/applicationStore";

interface ApplicationListProps {
  onViewApplication: (
    application: JobApplication
  ) => void;
}

type StatusFilter =
  | "All"
  | ApplicationStatus;

export function ApplicationList({
  onViewApplication,
}: ApplicationListProps) {
  /* =====================================================
     Store
  ===================================================== */

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
      (state) => state.updateApplicationStatus
    );

  /* =====================================================
     Local State
  ===================================================== */

  const [
    applicationToRemove,
    setApplicationToRemove,
  ] = useState<JobApplication | null>(null);

  const [
    clearDialogOpen,
    setClearDialogOpen,
  ] = useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All");

  /* =====================================================
     Format Date
  ===================================================== */

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown date";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =====================================================
     Status Change
  ===================================================== */

  const handleStatusChange = (
    applicationId: string,
    status: ApplicationStatus
  ) => {
    updateApplicationStatus(
      applicationId,
      status
    );
  };

  /* =====================================================
     Remove
  ===================================================== */

  const handleConfirmRemove = () => {
    if (!applicationToRemove) {
      return;
    }

    removeApplication(
      applicationToRemove.id
    );

    setApplicationToRemove(null);
  };

  /* =====================================================
     Clear All
  ===================================================== */

  const handleConfirmClearAll = () => {
    clearApplications();

    setClearDialogOpen(false);
    setSearchTerm("");
    setStatusFilter("All");
  };

  /* =====================================================
     Status Class
  ===================================================== */

  const getStatusClass = (
    status: ApplicationStatus
  ) => {
    return `status-${status
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };

  /* =====================================================
     Search + Status Filtering
  ===================================================== */

  const filteredApplications = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    return applications.filter(
      (application) => {
        const currentStatus =
          application.status ?? "Applied";

        /* ---------------------------------------------
           Status filter
        --------------------------------------------- */

        const matchesStatus =
          statusFilter === "All" ||
          currentStatus === statusFilter;

        if (!matchesStatus) {
          return false;
        }

        /* ---------------------------------------------
           Search filter
        --------------------------------------------- */

        if (!search) {
          return true;
        }

        const jobTitle =
          application.jobTitle
            .toLowerCase();

        const company =
          application.company
            .toLowerCase();

        const skills =
          application.skills
            ?.toLowerCase() ?? "";

        return (
          jobTitle.includes(search) ||
          company.includes(search) ||
          skills.includes(search)
        );
      }
    );
  }, [
    applications,
    searchTerm,
    statusFilter,
  ]);

  /* =====================================================
     Empty Applications
  ===================================================== */

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

  /* =====================================================
     Main UI
  ===================================================== */

  return (
    <>
      <section className="applications-section">

        {/* =================================================
           Header
        ================================================= */}

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

        {/* =================================================
           Search
        ================================================= */}

        <div className="application-search">
  <Search size={18} className="application-search-icon" />

  <Input
    value={searchTerm}
    placeholder="Search applications..."
    aria-label="Search applications"
    appearance="outline"
    size="large"
    onChange={(event) => {
      setSearchTerm(event.target.value);
    }}
  />
</div>

        {/* =================================================
           Status Filters
        ================================================= */}

        <div className="application-filters">

          <button
            type="button"
            className={
              statusFilter === "All"
                ? "application-filter active"
                : "application-filter"
            }
            onClick={() =>
              setStatusFilter("All")
            }
          >
            All
          </button>

          <button
            type="button"
            className={
              statusFilter === "Applied"
                ? "application-filter active"
                : "application-filter"
            }
            onClick={() =>
              setStatusFilter("Applied")
            }
          >
            Applied
          </button>

          <button
            type="button"
            className={
              statusFilter ===
              "Under Review"
                ? "application-filter active"
                : "application-filter"
            }
            onClick={() =>
              setStatusFilter(
                "Under Review"
              )
            }
          >
            Under Review
          </button>

          <button
            type="button"
            className={
              statusFilter === "Interview"
                ? "application-filter active"
                : "application-filter"
            }
            onClick={() =>
              setStatusFilter("Interview")
            }
          >
            Interview
          </button>

          <button
            type="button"
            className={
              statusFilter === "Selected"
                ? "application-filter active"
                : "application-filter"
            }
            onClick={() =>
              setStatusFilter("Selected")
            }
          >
            Selected
          </button>

          <button
            type="button"
            className={
              statusFilter === "Rejected"
                ? "application-filter active"
                : "application-filter"
            }
            onClick={() =>
              setStatusFilter("Rejected")
            }
          >
            Rejected
          </button>

        </div>

        {/* =================================================
           Result Count
        ================================================= */}

        <div className="applications-search-result">
          <Text size={300}>
            Showing{" "}
            <strong>
              {filteredApplications.length}
            </strong>{" "}
            of{" "}
            <strong>
              {applications.length}
            </strong>{" "}
            applications
          </Text>
        </div>

        {/* =================================================
           No Results
        ================================================= */}

        {filteredApplications.length === 0 ? (
          <div className="applications-empty">

            <Text
              size={500}
              weight="semibold"
              block
            >
              No applications found
            </Text>

            <Text
              size={300}
              block
            >
              Try changing your search or
              status filter.
            </Text>

            <Button
              appearance="secondary"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
              style={{
                marginTop: "16px",
              }}
            >
              Reset Filters
            </Button>

          </div>
        ) : (

          /* =================================================
             Application Cards
          ================================================= */

          <div className="applications-list">

            {filteredApplications.map(
              (application) => {

                const currentStatus =
                  application.status ??
                  "Applied";

                return (
                  <Card
                    key={application.id}
                    className="application-card"
                  >

                    <CardHeader
                      header={
                        <div className="application-card-header">

                          <div>
                            <Text
                              size={500}
                              weight="semibold"
                              block
                            >
                              {
                                application.jobTitle
                              }
                            </Text>

                            <Text
                              size={300}
                              block
                            >
                              {
                                application.company
                              }
                            </Text>
                          </div>

                          <span
                            className={`application-status ${getStatusClass(
                              currentStatus
                            )}`}
                          >
                            {currentStatus}
                          </span>

                        </div>
                      }
                    />

                    <div className="application-card-content">

                      {/* Date */}

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

                      {/* Status */}

                      <div className="application-status-control">

                        <label
                          htmlFor={`status-${application.id}`}
                        >
                          Status
                        </label>

                        <select
                          id={`status-${application.id}`}
                          value={currentStatus}
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

                          <option value="Under Review">
                            Under Review
                          </option>

                          <option value="Interview">
                            Interview
                          </option>

                          <option value="Selected">
                            Selected
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>
                        </select>

                      </div>

                      {/* Actions */}

                      <div className="application-actions">

                        <Button
                          appearance="secondary"
                          icon={
                            <Eye size={16} />
                          }
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
                          icon={
                            <Trash2 size={16} />
                          }
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
                );
              }
            )}

          </div>
        )}
      </section>

      {/* ===================================================
         Remove Confirmation
      =================================================== */}

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

      {/* ===================================================
         Clear All Confirmation
      =================================================== */}

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
    </>
  );
}