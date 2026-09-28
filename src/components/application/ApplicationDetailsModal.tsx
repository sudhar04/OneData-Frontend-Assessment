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
import { useRef } from "react";

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
  const pdfRef = useRef<HTMLDivElement>(null);

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

  const applicantName =
    `${application.firstName ?? ""} ${
      application.lastName ?? ""
    }`.trim();

  // =========================================================
  // PRINT
  // =========================================================

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      return;
    }

    const aboutMe = application.aboutMe || "";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>
            ${application.jobTitle} - Application
          </title>

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />

          <style>

            * {
              box-sizing: border-box;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
            }

            body {
              font-family:
                Inter,
                -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Arial,
                sans-serif;

              color: #0f172a;
              line-height: 1.5;
            }

            .print-page {
              width: 100%;
              max-width: 820px;
              margin: 0 auto;
              padding: 48px;
            }

            .print-brand {
              display: flex;
              align-items: center;
              gap: 12px;

              margin-bottom: 36px;
            }

            .brand-icon {
              width: 42px;
              height: 42px;

              display: flex;
              align-items: center;
              justify-content: center;

              border-radius: 12px;

              background: #2563eb;
              color: white;

              font-size: 20px;
              font-weight: 700;
            }

            .brand-name {
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;

              color: #2563eb;
            }

            .hero {
              margin-bottom: 36px;
              padding-bottom: 28px;

              border-bottom: 1px solid #e2e8f0;
            }

            .hero-label {
              margin-bottom: 8px;

              color: #64748b;

              font-size: 12px;
              font-weight: 700;

              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            .hero-title {
              margin: 0 0 8px;

              color: #0f172a;

              font-size: 30px;
              line-height: 1.2;
              font-weight: 750;
            }

            .hero-company {
              margin: 0;

              color: #64748b;

              font-size: 16px;
            }

            .section {
              margin-bottom: 28px;

              padding: 24px;

              border: 1px solid #e2e8f0;
              border-radius: 16px;

              background: #ffffff;
            }

            .section-title {
              margin: 0 0 18px;

              color: #0f172a;

              font-size: 17px;
              line-height: 1.3;
              font-weight: 700;
            }

            .detail-row {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;

              gap: 32px;

              padding: 13px 0;

              border-bottom: 1px solid #f1f5f9;
            }

            .detail-row:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }

            .detail-label {
              flex: 0 0 140px;

              color: #64748b;

              font-size: 13px;
              font-weight: 500;
            }

            .detail-value {
              flex: 1;

              min-width: 0;

              color: #0f172a;

              text-align: right;

              font-size: 14px;
              font-weight: 650;

              overflow-wrap: anywhere;
              word-break: break-word;
            }

            .about-me {
              color: #334155;

              font-size: 14px;
              line-height: 1.75;

              overflow-wrap: anywhere;
              word-break: break-word;
            }

            .about-me p {
              margin: 0 0 12px;
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
              margin-bottom: 5px;
            }

            .about-me a {
              color: #2563eb;
            }

            .footer {
              margin-top: 40px;
              padding-top: 18px;

              border-top: 1px solid #e2e8f0;

              color: #94a3b8;

              font-size: 11px;

              text-align: center;
            }

            @media print {

              @page {
                size: A4;
                margin: 0;
              }

              body {
                background: #ffffff;
              }

              .print-page {
                max-width: none;
                padding: 36px;
              }

              .section {
                break-inside: avoid;
              }

            }

          </style>
        </head>

        <body>

          <div class="print-page">

            <div class="print-brand">
              <div class="brand-icon">✓</div>

              <div class="brand-name">
                Job Portal
              </div>
            </div>

            <div class="hero">

              <div class="hero-label">
                Application Record
              </div>

              <h1 class="hero-title">
                ${application.jobTitle}
              </h1>

              <p class="hero-company">
                ${application.company}
              </p>

            </div>

            <div class="section">

              <h2 class="section-title">
                Job Information
              </h2>

              <div class="detail-row">
                <span class="detail-label">
                  Job Title
                </span>

                <strong class="detail-value">
                  ${application.jobTitle}
                </strong>
              </div>

              <div class="detail-row">
                <span class="detail-label">
                  Company
                </span>

                <strong class="detail-value">
                  ${application.company}
                </strong>
              </div>

              <div class="detail-row">
                <span class="detail-label">
                  Applied On
                </span>

                <strong class="detail-value">
                  ${appliedDate}
                </strong>
              </div>

            </div>

            <div class="section">

              <h2 class="section-title">
                Applicant Information
              </h2>

              <div class="detail-row">
                <span class="detail-label">
                  Name
                </span>

                <strong class="detail-value">
                  ${applicantName}
                </strong>
              </div>

              <div class="detail-row">
                <span class="detail-label">
                  Email
                </span>

                <strong class="detail-value">
                  ${application.email ?? ""}
                </strong>
              </div>

              <div class="detail-row">
                <span class="detail-label">
                  Phone
                </span>

                <strong class="detail-value">
                  ${application.phone ?? ""}
                </strong>
              </div>

              <div class="detail-row">
                <span class="detail-label">
                  Skills
                </span>

                <strong class="detail-value">
                  ${skills}
                </strong>
              </div>

            </div>

            <div class="section">

              <h2 class="section-title">
                About Me
              </h2>

              <div class="about-me">
                ${aboutMe}
              </div>

            </div>

            <div class="footer">
              Generated from Job Portal Application Tracker
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

  // =========================================================
  // DOWNLOAD PDF
  // =========================================================

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;

    if (!element) {
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,

        windowWidth: 794,
        width: 794,
      });

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

      const pdfWidth =
        pageWidth - margin * 2;

      const pdfHeight =
        pageHeight - margin * 2;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio =
        canvasWidth / pdfWidth;

      const pageCanvasHeight =
        Math.floor(pdfHeight * ratio);

      let offsetY = 0;

      let pageNumber = 0;

      while (offsetY < canvasHeight) {
        const remainingHeight =
          canvasHeight - offsetY;

        const currentHeight = Math.min(
          pageCanvasHeight,
          remainingHeight
        );

        const pageCanvas =
          document.createElement("canvas");

        pageCanvas.width = canvasWidth;
        pageCanvas.height = currentHeight;

        const pageContext =
          pageCanvas.getContext("2d");

        if (!pageContext) {
          throw new Error(
            "Unable to create PDF canvas context."
          );
        }

        pageContext.fillStyle = "#ffffff";

        pageContext.fillRect(
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );

        pageContext.drawImage(
          canvas,
          0,
          offsetY,
          canvasWidth,
          currentHeight,
          0,
          0,
          canvasWidth,
          currentHeight
        );

        const imageData =
          pageCanvas.toDataURL("image/png");

        const imageHeight =
          currentHeight / ratio;

        if (pageNumber > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          imageData,
          "PNG",
          margin,
          margin,
          pdfWidth,
          imageHeight
        );

        offsetY += currentHeight;

        pageNumber++;
      }

      const safeCompany =
        application.company
          .replace(/[^a-z0-9]/gi, "-")
          .replace(/-+/g, "-")
          .toLowerCase();

      const safeJobTitle =
        application.jobTitle
          .replace(/[^a-z0-9]/gi, "-")
          .replace(/-+/g, "-")
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

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          APPLICATION DETAILS MODAL
      ===================================================== */}

      <Dialog
        open={open}
        onOpenChange={(_, data) => {
          if (!data.open) {
            onClose();
          }
        }}
      >

        <DialogSurface
          className="app-details-modal-v2"
          style={{
            width: "min(760px, calc(100vw - 32px))",
            maxWidth: "760px",
            height: "min(760px, calc(100vh - 32px))",
            maxHeight: "calc(100vh - 32px)",
            padding: 0,
            margin: "16px auto",
            overflow: "hidden",
            borderRadius: "20px",
            background: "#ffffff",
            boxShadow:
              "0 30px 80px rgba(15, 23, 42, 0.22)",
          }}
        >

          <DialogBody
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              minHeight: 0,
              padding: 0,
              overflow: "hidden",
            }}
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",

                padding:
                  "20px 24px",

                borderBottom:
                  "1px solid #e2e8f0",

                background:
                  "rgba(255,255,255,0.98)",
              }}
            >

              <div>

                <div
                  style={{
                    marginBottom: "4px",

                    color: "#2563eb",

                    fontSize: "11px",
                    fontWeight: 750,

                    letterSpacing:
                      "0.12em",

                    textTransform:
                      "uppercase",
                  }}
                >
                  Application Record
                </div>

                <DialogTitle
                  style={{
                    margin: 0,
                    padding: 0,

                    color: "#0f172a",

                    fontSize: "22px",
                    lineHeight: 1.25,
                    fontWeight: 750,
                  }}
                >
                  Job Application Details
                </DialogTitle>

              </div>

            </div>

            {/* =================================================
                SCROLLABLE CONTENT
            ================================================= */}

            <DialogContent
              style={{
                flex: "1 1 auto",

                width: "100%",

                minHeight: 0,

                margin: 0,

                padding:
                  "24px",

                overflowY: "auto",
                overflowX: "hidden",

                background:
                  "#f8fafc",

                boxSizing:
                  "border-box",
              }}
            >

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",

                  gap: "18px",

                  width: "100%",

                  boxSizing:
                    "border-box",
                }}
              >

                {/* =================================================
                    JOB INFORMATION
                ================================================= */}

                <section
                  style={{
                    width: "100%",

                    padding: "22px",

                    border:
                      "1px solid #e2e8f0",

                    borderRadius: "16px",

                    background: "#ffffff",

                    boxShadow:
                      "0 1px 3px rgba(15,23,42,0.04)",

                    boxSizing:
                      "border-box",
                  }}
                >

                  <Text
                    size={500}
                    weight="semibold"
                    style={{
                      display: "block",

                      margin:
                        "0 0 16px",

                      color: "#0f172a",

                      fontSize: "17px",
                    }}
                  >
                    Job Information
                  </Text>

                  <DetailRow
                    label="Job Title"
                    value={application.jobTitle}
                  />

                  <DetailRow
                    label="Company"
                    value={application.company}
                  />

                  <DetailRow
                    label="Applied On"
                    value={appliedDate}
                    last
                  />

                </section>

                {/* =================================================
                    APPLICANT INFORMATION
                ================================================= */}

                <section
                  style={{
                    width: "100%",

                    padding: "22px",

                    border:
                      "1px solid #e2e8f0",

                    borderRadius: "16px",

                    background: "#ffffff",

                    boxShadow:
                      "0 1px 3px rgba(15,23,42,0.04)",

                    boxSizing:
                      "border-box",
                  }}
                >

                  <Text
                    size={500}
                    weight="semibold"
                    style={{
                      display: "block",

                      margin:
                        "0 0 16px",

                      color: "#0f172a",

                      fontSize: "17px",
                    }}
                  >
                    Applicant Information
                  </Text>

                  <DetailRow
                    label="Name"
                    value={applicantName}
                  />

                  <DetailRow
                    label="Email"
                    value={application.email}
                  />

                  <DetailRow
                    label="Phone"
                    value={application.phone}
                  />

                  <DetailRow
                    label="Skills"
                    value={skills}
                    last
                  />

                </section>

                {/* =================================================
                    ABOUT ME
                ================================================= */}

                <section
                  style={{
                    width: "100%",

                    padding: "22px",

                    border:
                      "1px solid #e2e8f0",

                    borderRadius: "16px",

                    background: "#ffffff",

                    boxShadow:
                      "0 1px 3px rgba(15,23,42,0.04)",

                    boxSizing:
                      "border-box",
                  }}
                >

                  <Text
                    size={500}
                    weight="semibold"
                    style={{
                      display: "block",

                      margin:
                        "0 0 16px",

                      color: "#0f172a",

                      fontSize: "17px",
                    }}
                  >
                    About Me
                  </Text>

                  <div
                    style={{
                      width: "100%",

                      padding: "16px",

                      borderRadius: "12px",

                      background:
                        "#f8fafc",

                      color:
                        "#334155",

                      fontSize: "14px",

                      lineHeight: 1.7,

                      overflowWrap:
                        "anywhere",

                      wordBreak:
                        "break-word",

                      boxSizing:
                        "border-box",
                    }}
                  >

                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          application.aboutMe ||
                          "No information provided.",
                      }}
                    />

                  </div>

                </section>

              </div>

            </DialogContent>

            {/* =================================================
                FOOTER ACTIONS
            ================================================= */}

            <DialogActions
              style={{
                flexShrink: 0,

                display: "flex",

                justifyContent:
                  "flex-end",

                alignItems: "center",

                gap: "10px",

                flexWrap: "wrap",

                padding:
                  "14px 24px",

                margin: 0,

                borderTop:
                  "1px solid #e2e8f0",

                background:
                  "#ffffff",

                boxSizing:
                  "border-box",
              }}
            >

              <Button
                appearance="secondary"
                onClick={handlePrint}
                style={{
                  minHeight: "40px",
                  borderRadius: "9px",
                  fontWeight: 600,
                }}
              >
                Print
              </Button>

              <Button
                appearance="secondary"
                onClick={handleDownloadPDF}
                style={{
                  minHeight: "40px",
                  borderRadius: "9px",
                  fontWeight: 600,
                }}
              >
                Download PDF
              </Button>

              <Button
                appearance="primary"
                onClick={onClose}
                style={{
                  minHeight: "40px",
                  borderRadius: "9px",
                  fontWeight: 600,
                }}
              >
                Close
              </Button>

            </DialogActions>

          </DialogBody>

        </DialogSurface>

      </Dialog>

      {/* =======================================================
          PDF-ONLY DOCUMENT

          IMPORTANT:
          This is NOT the modal.

          It exists only for html2canvas.
      ======================================================= */}

      <div
        ref={pdfRef}
        style={{
          position: "fixed",

          left: "-10000px",
          top: "0",

          width: "794px",

          padding: "48px",

          background: "#ffffff",

          color: "#0f172a",

          fontFamily:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',

          boxSizing: "border-box",

          pointerEvents: "none",

          zIndex: -1,
        }}
      >

        {/* PDF BRAND */}

        <div
          style={{
            display: "flex",
            alignItems: "center",

            gap: "12px",

            marginBottom: "36px",
          }}
        >

          <div
            style={{
              width: "42px",
              height: "42px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: "12px",

              background: "#2563eb",
              color: "#ffffff",

              fontSize: "20px",
              fontWeight: 700,

              flexShrink: 0,
            }}
          >
            ✓
          </div>

          <div
            style={{
              color: "#2563eb",

              fontSize: "14px",
              fontWeight: 750,

              letterSpacing:
                "0.08em",

              textTransform:
                "uppercase",
            }}
          >
            Job Portal
          </div>

        </div>

        {/* PDF HERO */}

        <div
          style={{
            marginBottom: "32px",

            paddingBottom: "28px",

            borderBottom:
              "1px solid #e2e8f0",
          }}
        >

          <div
            style={{
              marginBottom: "8px",

              color: "#64748b",

              fontSize: "12px",
              fontWeight: 700,

              letterSpacing:
                "0.12em",

              textTransform:
                "uppercase",
            }}
          >
            Application Record
          </div>

          <div
            style={{
              marginBottom: "8px",

              color: "#0f172a",

              fontSize: "30px",
              lineHeight: 1.2,
              fontWeight: 750,

              overflowWrap:
                "anywhere",
            }}
          >
            {application.jobTitle}
          </div>

          <div
            style={{
              color: "#64748b",

              fontSize: "16px",

              overflowWrap:
                "anywhere",
            }}
          >
            {application.company}
          </div>

        </div>

        {/* PDF JOB INFORMATION */}

        <PdfSection title="Job Information">

          <PdfRow
            label="Job Title"
            value={application.jobTitle}
          />

          <PdfRow
            label="Company"
            value={application.company}
          />

          <PdfRow
            label="Applied On"
            value={appliedDate}
            last
          />

        </PdfSection>

        {/* PDF APPLICANT INFORMATION */}

        <PdfSection title="Applicant Information">

          <PdfRow
            label="Name"
            value={applicantName}
          />

          <PdfRow
            label="Email"
            value={application.email}
          />

          <PdfRow
            label="Phone"
            value={application.phone}
          />

          <PdfRow
            label="Skills"
            value={skills}
            last
          />

        </PdfSection>

        {/* PDF ABOUT ME */}

        <PdfSection title="About Me">

          <div
            style={{
              padding: "16px",

              borderRadius: "12px",

              background: "#f8fafc",

              color: "#334155",

              fontSize: "14px",

              lineHeight: 1.75,

              overflowWrap:
                "anywhere",

              wordBreak:
                "break-word",
            }}
          >

            <div
              dangerouslySetInnerHTML={{
                __html:
                  application.aboutMe ||
                  "No information provided.",
              }}
            />

          </div>

        </PdfSection>

        {/* PDF FOOTER */}

        <div
          style={{
            marginTop: "40px",

            paddingTop: "18px",

            borderTop:
              "1px solid #e2e8f0",

            color: "#94a3b8",

            fontSize: "11px",

            textAlign: "center",
          }}
        >
          Generated from Job Portal Application Tracker
        </div>

      </div>
    </>
  );
}

// =============================================================
// DETAIL ROW
// =============================================================

interface DetailRowProps {
  label: string;
  value: unknown;
  last?: boolean;
}

function DetailRow({
  label,
  value,
  last = false,
}: DetailRowProps) {
  return (
    <div
      style={{
        display: "flex",

        alignItems: "flex-start",

        justifyContent:
          "space-between",

        gap: "24px",

        width: "100%",

        padding: "12px 0",

        borderBottom: last
          ? "none"
          : "1px solid #f1f5f9",

        boxSizing:
          "border-box",
      }}
    >

      <span
        style={{
          flex:
            "0 0 120px",

          color:
            "#64748b",

          fontSize:
            "13px",

          lineHeight:
            1.5,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          flex: "1 1 auto",

          minWidth: 0,

          color:
            "#0f172a",

          fontSize:
            "14px",

          lineHeight:
            1.5,

          fontWeight:
            650,

          textAlign:
            "right",

          overflowWrap:
            "anywhere",

          wordBreak:
            "break-word",
        }}
      >
        {String(value ?? "")}
      </strong>

    </div>
  );
}

// =============================================================
// PDF SECTION
// =============================================================

interface PdfSectionProps {
  title: string;
  children: React.ReactNode;
}

function PdfSection({
  title,
  children,
}: PdfSectionProps) {
  return (
    <div
      style={{
        marginBottom: "28px",

        padding: "24px",

        border:
          "1px solid #e2e8f0",

        borderRadius: "16px",

        background:
          "#ffffff",

        boxSizing:
          "border-box",
      }}
    >

      <div
        style={{
          marginBottom: "18px",

          color:
            "#0f172a",

          fontSize:
            "17px",

          lineHeight:
            1.3,

          fontWeight:
            700,
        }}
      >
        {title}
      </div>

      {children}

    </div>
  );
}

// =============================================================
// PDF ROW
// =============================================================

interface PdfRowProps {
  label: string;
  value: unknown;
  last?: boolean;
}

function PdfRow({
  label,
  value,
  last = false,
}: PdfRowProps) {
  return (
    <div
      style={{
        display: "flex",

        alignItems:
          "flex-start",

        justifyContent:
          "space-between",

        gap: "32px",

        padding:
          "13px 0",

        borderBottom:
          last
            ? "none"
            : "1px solid #f1f5f9",

        boxSizing:
          "border-box",
      }}
    >

      <span
        style={{
          flex:
            "0 0 140px",

          color:
            "#64748b",

          fontSize:
            "13px",

          fontWeight:
            500,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          flex:
            "1",

          minWidth:
            0,

          color:
            "#0f172a",

          textAlign:
            "right",

          fontSize:
            "14px",

          fontWeight:
            650,

          overflowWrap:
            "anywhere",

          wordBreak:
            "break-word",
        }}
      >
        {String(value ?? "")}
      </strong>

    </div>
  );
}