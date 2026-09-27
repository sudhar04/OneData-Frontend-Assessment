import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Text,
} from "@fluentui/react-components";

import type { JobApplication } from "../../store/applicationStore";

interface ApplicationDetailsModalProps {
  open: boolean;
  application: JobApplication | null;
  onClose: () => void;
}

export function ApplicationDetailsModal({
  open,
  application,
  onClose,
}: ApplicationDetailsModalProps) {
  if (!application) {
    return null;
  }

  const appliedDate = new Date(
    application.appliedAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DialogSurface className="application-details-dialog">
        <DialogBody>
          <DialogTitle>
            Job Application Details
          </DialogTitle>

          <DialogContent>
            <div className="application-details">

              {/* Job Information */}

              <section className="application-details-section">
                <Text
                  size={500}
                  weight="semibold"
                >
                  Job Information
                </Text>

                <div className="application-detail-row">
                  <span>Job Title</span>
                  <strong>{application.jobTitle}</strong>
                </div>

                <div className="application-detail-row">
                  <span>Company</span>
                  <strong>{application.company}</strong>
                </div>

                <div className="application-detail-row">
                  <span>Applied On</span>
                  <strong>{appliedDate}</strong>
                </div>
              </section>

              {/* Applicant Information */}

              <section className="application-details-section">
                <Text
                  size={500}
                  weight="semibold"
                >
                  Applicant Information
                </Text>

                <div className="application-detail-row">
                  <span>Name</span>
                  <strong>
                    {application.firstName}{" "}
                    {application.lastName}
                  </strong>
                </div>

                <div className="application-detail-row">
                  <span>Email</span>
                  <strong>{application.email}</strong>
                </div>

                <div className="application-detail-row">
                  <span>Phone</span>
                  <strong>{application.phone}</strong>
                </div>

                <div className="application-detail-row">
                  <span>Skills</span>
                  <strong>{application.skills}</strong>
                </div>
              </section>

              {/* About Me */}

              <section className="application-details-section">
                <Text
                  size={500}
                  weight="semibold"
                >
                  About Me
                </Text>

                <div className="application-about-me">
                  {application.aboutMe}
                </div>
              </section>

            </div>
          </DialogContent>

          <DialogActions>
            <Button
              appearance="primary"
              onClick={onClose}
            >
              Close
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}