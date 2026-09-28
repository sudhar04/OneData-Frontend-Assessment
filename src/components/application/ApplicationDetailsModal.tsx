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

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  // --------------------------------------------------
  // PRINT APPLICATION
  // --------------------------------------------------

  const handlePrint = () => {
    const printContent = document.getElementById(
      "application-print-area"
    );

    if (!printContent) {
      return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>
            Job Application - ${application.jobTitle}
          </title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 40px;
              font-family: Arial, sans-serif;
              color: #1f2937;
              background: #ffffff;
            }

            .print-header {
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #2563eb;
            }

            .print-header h1 {
              margin: 0 0 8px;
              font-size: 26px;
            }

            .print-header p {
              margin: 0;
              color: #64748b;
            }

            .section {
              margin-bottom: 28px;
            }

            .section-title {
              margin-bottom: 14px;
              font-size: 17px;
              font-weight: 700;
              color: #2563eb;
            }

            .row {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: 20px;
              padding: 10px 0;
              border-bottom: 1px solid #e5e7eb;
            }

            .row span {
              color: #64748b;
              flex-shrink: 0;
            }

            .row strong {
              text-align: right;
              word-break: break-word;
            }

            .about-me {
              line-height: 1.7;
              word-break: break-word;
            }

            .about-me p {
              margin: 0 0 10px;
            }

            .about-me ul,
            .about-me ol {
              margin: 10px 0;
              padding-left: 24px;
            }

            .about-me a {
              color: #2563eb;
              text-decoration: underline;
            }

            .about-me blockquote {
              margin: 12px 0;
              padding-left: 16px;
              border-left: 4px solid #2563eb;
              color: #475569;
            }

            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>

        <body>
          <div class="print-header">
            <h1>Job Application</h1>

            <p>
              ${application.jobTitle} —
              ${application.company}
            </p>
          </div>

          <div class="section">
            <div class="section-title">
              Job Information
            </div>

            <div class="row">
              <span>Job Title</span>
              <strong>
                ${application.jobTitle}
              </strong>
            </div>

            <div class="row">
              <span>Company</span>
              <strong>
                ${application.company}
              </strong>
            </div>

            <div class="row">
              <span>Applied On</span>
              <strong>
                ${appliedDate}
              </strong>
            </div>
          </div>

          <div class="section">
            <div class="section-title">
              Applicant Information
            </div>

            <div class="row">
              <span>Name</span>
              <strong>
                ${application.firstName}
                ${application.lastName}
              </strong>
            </div>

            <div class="row">
              <span>Email</span>
              <strong>
                ${application.email}
              </strong>
            </div>

            <div class="row">
              <span>Phone</span>
              <strong>
                ${application.phone}
              </strong>
            </div>

            <div class="row">
              <span>Skills</span>
              <strong>
                ${Array.isArray(application.skills)
                  ? application.skills.join(", ")
                  : application.skills}
              </strong>
            </div>
          </div>

          <div class="section">
            <div class="section-title">
              About Me
            </div>

            <div class="about-me">
              ${application.aboutMe}
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  // --------------------------------------------------
  // DOWNLOAD PDF
  // --------------------------------------------------

  const handleDownloadPDF = async () => {
    const element = document.getElementById(
      "application-print-area"
    );

    if (!element) {
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      const margin = 10;

      const availableWidth =
        pageWidth - margin * 2;

      const imageHeight =
        (canvas.height * availableWidth) /
        canvas.width;

      const availablePageHeight =
        pageHeight - margin * 2;

      let heightLeft = imageHeight;

      let position = margin;

      // First page
      pdf.addImage(
        imageData,
        "PNG",
        margin,
        position,
        availableWidth,
        imageHeight
      );

      heightLeft -= availablePageHeight;

      // Additional pages
      while (heightLeft > 0) {
        position =
          margin -
          (imageHeight - heightLeft);

        pdf.addPage();

        pdf.addImage(
          imageData,
          "PNG",
          margin,
          position,
          availableWidth,
          imageHeight
        );

        heightLeft -= availablePageHeight;
      }

      const safeCompany =
        application.company
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase();

      const safeJobTitle =
        application.jobTitle
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase();

      pdf.save(
        `${safeCompany}-${safeJobTitle}-application.pdf`
      );
    } catch (error) {
      console.error(
        "Failed to generate PDF:",
        error
      );
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DialogSurface
        style={{
          width: "min(720px, calc(100vw - 32px))",
          maxWidth: "720px",
          maxHeight: "calc(100vh - 32px)",
          overflow: "hidden",
          margin: "16px auto",
        }}
      >
        <DialogBody
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "calc(100vh - 32px)",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* TITLE */}

          <DialogTitle
            style={{
              flexShrink: 0,
              paddingBottom: "12px",
              marginBottom: "0",
            }}
          >
            Job Application Details
          </DialogTitle>

          {/* SCROLLABLE CONTENT */}

          <DialogContent
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 4px 16px",
            }}
          >
            <div
              id="application-print-area"
              className="application-details"
              style={{
                width: "100%",
                backgroundColor: "#ffffff",
                padding: "4px",
              }}
            >
              {/* -------------------------------- */}
              {/* JOB INFORMATION */}
              {/* -------------------------------- */}

              <section
                className="application-details-section"
                style={{
                  marginBottom: "24px",
                  width: "100%",
                }}
              >
                <Text
                  size={500}
                  weight="semibold"
                  style={{
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  Job Information
                </Text>

                <div
                  className="application-detail-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <span>Job Title</span>

                  <strong
                    style={{
                      textAlign: "right",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {application.jobTitle}
                  </strong>
                </div>

                <div
                  className="application-detail-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <span>Company</span>

                  <strong
                    style={{
                      textAlign: "right",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {application.company}
                  </strong>
                </div>

                <div
                  className="application-detail-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <span>Applied On</span>

                  <strong
                    style={{
                      textAlign: "right",
                    }}
                  >
                    {appliedDate}
                  </strong>
                </div>
              </section>

              {/* -------------------------------- */}
              {/* APPLICANT INFORMATION */}
              {/* -------------------------------- */}

              <section
                className="application-details-section"
                style={{
                  marginBottom: "24px",
                  width: "100%",
                }}
              >
                <Text
                  size={500}
                  weight="semibold"
                  style={{
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  Applicant Information
                </Text>

                <div
                  className="application-detail-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <span>Name</span>

                  <strong
                    style={{
                      textAlign: "right",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {application.firstName}{" "}
                    {application.lastName}
                  </strong>
                </div>

                <div
                  className="application-detail-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <span>Email</span>

                  <strong
                    style={{
                      textAlign: "right",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {application.email}
                  </strong>
                </div>

                <div
                  className="application-detail-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <span>Phone</span>

                  <strong
                    style={{
                      textAlign: "right",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {application.phone}
                  </strong>
                </div>

                <div
                  className="application-detail-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                  }}
                >
                  <span>Skills</span>

                  <strong
                    style={{
                      textAlign: "right",
                      overflowWrap: "anywhere",
                      maxWidth: "65%",
                    }}
                  >
                    {Array.isArray(application.skills)
                      ? application.skills.join(", ")
                      : application.skills}
                  </strong>
                </div>
              </section>

              {/* -------------------------------- */}
              {/* ABOUT ME */}
              {/* -------------------------------- */}

              <section
                className="application-details-section"
                style={{
                  marginBottom: "8px",
                  width: "100%",
                }}
              >
                <Text
                  size={500}
                  weight="semibold"
                  style={{
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  About Me
                </Text>

                <div
                  className="application-about-me"
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                    lineHeight: 1.6,
                    overflowWrap: "anywhere",
                  }}
                >
                  <style>
                    {`
                      .application-about-me p {
                        margin: 0 0 10px;
                      }

                      .application-about-me p:last-child {
                        margin-bottom: 0;
                      }

                      .application-about-me ul,
                      .application-about-me ol {
                        margin: 10px 0;
                        padding-left: 24px;
                      }

                      .application-about-me li {
                        margin-bottom: 4px;
                      }

                      .application-about-me a {
                        color: #2563eb;
                        text-decoration: underline;
                      }

                      .application-about-me blockquote {
                        margin: 12px 0;
                        padding-left: 16px;
                        border-left: 4px solid #2563eb;
                        color: #475569;
                      }
                    `}
                  </style>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: application.aboutMe,
                    }}
                  />
                </div>
              </section>
            </div>
          </DialogContent>

          {/* FIXED ACTION BUTTONS */}

          <DialogActions
            className="application-dialog-actions"
          >
            <Button
              className="application-dialog-button"
              appearance="secondary"
              onClick={handlePrint}
            >
              Print
            </Button>

            <Button
              className="application-dialog-button"
              appearance="secondary"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>

            <Button
              className="application-dialog-button"
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