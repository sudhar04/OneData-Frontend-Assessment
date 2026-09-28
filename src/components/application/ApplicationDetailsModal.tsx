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

  const skills = Array.isArray(application.skills)
    ? application.skills.join(", ")
    : String(application.skills ?? "");

  // =====================================================
  // PRINT APPLICATION
  // =====================================================

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
              font-family: Arial, Helvetica, sans-serif;
              color: #1f2937;
              background: #ffffff;
              line-height: 1.5;
            }

            .print-container {
              width: 100%;
              max-width: 900px;
              margin: 0 auto;
            }

            .print-header {
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #2563eb;
            }

            .print-header h1 {
              margin: 0 0 8px;
              font-size: 28px;
              color: #111827;
            }

            .print-header p {
              margin: 0;
              color: #64748b;
              font-size: 15px;
            }

            .section {
              margin-bottom: 28px;
            }

            .section-title {
              margin-bottom: 14px;
              font-size: 18px;
              font-weight: 700;
              color: #2563eb;
            }

            .row {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              gap: 24px;
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
            }

            .row span {
              color: #64748b;
              min-width: 120px;
              flex-shrink: 0;
            }

            .row strong {
              text-align: right;
              word-break: break-word;
              overflow-wrap: anywhere;
            }

            .about-me {
              line-height: 1.7;
              word-break: break-word;
              overflow-wrap: anywhere;
            }

            .about-me p {
              margin: 0 0 10px;
            }

            .about-me p:last-child {
              margin-bottom: 0;
            }

            .about-me ul,
            .about-me ol {
              margin: 10px 0;
              padding-left: 24px;
            }

            .about-me li {
              margin-bottom: 4px;
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

              .section {
                break-inside: avoid;
              }
            }
          </style>
        </head>

        <body>
          <div class="print-container">

            <div class="print-header">
              <h1>Job Application</h1>

              <p>
                ${application.jobTitle}
                —
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
                  ${skills}
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

          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // =====================================================
  // DOWNLOAD PDF
  // =====================================================

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

      const availableHeight =
        pageHeight - margin * 2;

      const imageHeight =
        (canvas.height * availableWidth) /
        canvas.width;

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

      heightLeft -= availableHeight;

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

        heightLeft -= availableHeight;
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

  // =====================================================
  // UI
  // =====================================================

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
        <DialogBody className="application-details-dialog-body">
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            style={{
              flexShrink: 0,
              padding: "20px 24px 16px",
              borderBottom: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              position: "relative",
              zIndex: 2,
            }}
          >
            <DialogTitle
              style={{
                margin: 0,
                padding: 0,
                fontSize: "22px",
                lineHeight: 1.3,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Job Application Details
            </DialogTitle>
          </div>

          {/* =================================================
              SCROLLABLE CONTENT
          ================================================= */}

          <DialogContent className="application-details-dialog-content">
            <div
              id="application-print-area"
              className="application-details"
              style={{
                width: "100%",
                maxWidth: "100%",
                margin: 0,
                padding: 0,
                backgroundColor: "#ffffff",
                color: "#1f2937",
                boxSizing: "border-box",
                overflowWrap: "anywhere",
              }}
            >
              {/* =================================================
                  JOB INFORMATION
              ================================================= */}

              <section
                className="application-details-section"
                style={{
                  width: "100%",
                  margin: "0 0 28px",
                  padding: 0,
                  boxSizing: "border-box",
                }}
              >
                <Text
                  size={500}
                  weight="semibold"
                  style={{
                    display: "block",
                    margin: "0 0 14px",
                    padding: 0,
                    color: "#111827",
                    lineHeight: 1.4,
                  }}
                >
                  Job Information
                </Text>

                {/* Job title */}

                <div
                  className="application-detail-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 120px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Job Title
                  </span>

                  <strong
                    style={{
                      flex: "1 1 auto",
                      minWidth: 0,
                      textAlign: "right",
                      color: "#111827",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      fontSize: "14px",
                    }}
                  >
                    {application.jobTitle}
                  </strong>
                </div>

                {/* Company */}

                <div
                  className="application-detail-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 120px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Company
                  </span>

                  <strong
                    style={{
                      flex: "1 1 auto",
                      minWidth: 0,
                      textAlign: "right",
                      color: "#111827",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      fontSize: "14px",
                    }}
                  >
                    {application.company}
                  </strong>
                </div>

                {/* Applied date */}

                <div
                  className="application-detail-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 120px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Applied On
                  </span>

                  <strong
                    style={{
                      flex: "1 1 auto",
                      minWidth: 0,
                      textAlign: "right",
                      color: "#111827",
                      fontSize: "14px",
                    }}
                  >
                    {appliedDate}
                  </strong>
                </div>
              </section>

              {/* =================================================
                  APPLICANT INFORMATION
              ================================================= */}

              <section
                className="application-details-section"
                style={{
                  width: "100%",
                  margin: "0 0 28px",
                  padding: 0,
                  boxSizing: "border-box",
                }}
              >
                <Text
                  size={500}
                  weight="semibold"
                  style={{
                    display: "block",
                    margin: "0 0 14px",
                    padding: 0,
                    color: "#111827",
                    lineHeight: 1.4,
                  }}
                >
                  Applicant Information
                </Text>

                {/* Name */}

                <div
                  className="application-detail-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 120px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Name
                  </span>

                  <strong
                    style={{
                      flex: "1 1 auto",
                      minWidth: 0,
                      textAlign: "right",
                      color: "#111827",
                      overflowWrap: "anywhere",
                      fontSize: "14px",
                    }}
                  >
                    {application.firstName}{" "}
                    {application.lastName}
                  </strong>
                </div>

                {/* Email */}

                <div
                  className="application-detail-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 120px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Email
                  </span>

                  <strong
                    style={{
                      flex: "1 1 auto",
                      minWidth: 0,
                      textAlign: "right",
                      color: "#111827",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      fontSize: "14px",
                    }}
                  >
                    {application.email}
                  </strong>
                </div>

                {/* Phone */}

                <div
                  className="application-detail-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 120px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Phone
                  </span>

                  <strong
                    style={{
                      flex: "1 1 auto",
                      minWidth: 0,
                      textAlign: "right",
                      color: "#111827",
                      overflowWrap: "anywhere",
                      fontSize: "14px",
                    }}
                  >
                    {application.phone}
                  </strong>
                </div>

                {/* Skills */}

                <div
                  className="application-detail-row"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #e5e7eb",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 120px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    Skills
                  </span>

                  <strong
                    style={{
                      flex: "1 1 auto",
                      minWidth: 0,
                      maxWidth: "70%",
                      textAlign: "right",
                      color: "#111827",
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      fontSize: "14px",
                    }}
                  >
                    {skills}
                  </strong>
                </div>
              </section>

              {/* =================================================
                  ABOUT ME
              ================================================= */}

              <section
                className="application-details-section"
                style={{
                  width: "100%",
                  margin: "0",
                  padding: 0,
                  boxSizing: "border-box",
                }}
              >
                <Text
                  size={500}
                  weight="semibold"
                  style={{
                    display: "block",
                    margin: "0 0 14px",
                    padding: 0,
                    color: "#111827",
                    lineHeight: 1.4,
                  }}
                >
                  About Me
                </Text>

                <div
                  className="application-about-me"
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    padding: "16px",
                    margin: 0,
                    borderRadius: "8px",
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    lineHeight: 1.7,
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    boxSizing: "border-box",
                    fontSize: "14px",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: application.aboutMe,
                    }}
                  />
                </div>
              </section>
            </div>
          </DialogContent>

          {/* =================================================
              FIXED ACTION BUTTONS
          ================================================= */}

          <DialogActions
            className="application-dialog-actions"
            style={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              padding: "16px 24px",
              margin: 0,
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              position: "relative",
              zIndex: 3,
              boxSizing: "border-box",
            }}
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