import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Field,
  Input,
} from "@fluentui/react-components";

import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import type { ApplicationData } from "../../types/application";
import { useApplicationStore } from "../../store/applicationStore";

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  company: string;
  onSubmit?: (application: ApplicationData) => void;
}

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  skills?: string;
  aboutMe?: string;
};

export function ApplicationModal({
  open,
  onClose,
  jobTitle,
  company,
  onSubmit,
}: ApplicationModalProps) {
  // --------------------------------
  // Zustand
  // --------------------------------

  const addApplication = useApplicationStore(
    (state) => state.addApplication
  );

  // --------------------------------
  // Form State
  // --------------------------------

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // --------------------------------
  // React Quill Configuration
  // --------------------------------

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
  ];

  // --------------------------------
  // Validation
  // --------------------------------

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(phone.trim())) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!skills.trim()) {
      newErrors.skills = "Please enter your skills.";
    }

    // Remove HTML tags before checking if About Me is empty
    const plainAboutMe = aboutMe
      .replace(/<(.|\n)*?>/g, "")
      .trim();

    if (!plainAboutMe) {
      newErrors.aboutMe = "Please tell us about yourself.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------
  // Clear Individual Error
  // --------------------------------

  const clearError = (field: keyof FormErrors) => {
    if (!errors[field]) {
      return;
    }

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  // --------------------------------
  // Submit Application
  // --------------------------------

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const application: ApplicationData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      skills: skills.trim(),
      aboutMe: aboutMe,
    };

    // Save application in Zustand
    addApplication(application, jobTitle, company);

    // Optional parent callback
    onSubmit?.(application);

    // Show success screen
    setSubmitted(true);
  };

  // --------------------------------
  // Reset Form
  // --------------------------------

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSkills("");
    setAboutMe("");

    setErrors({});
    setSubmitted(false);
  };

  // --------------------------------
  // Close Modal
  // --------------------------------

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) {
          handleClose();
        }
      }}
    >
      <DialogSurface className="application-dialog-surface">
        <DialogBody className="application-dialog-body">

          {/* =========================
              HEADER
          ========================== */}

          <DialogTitle className="application-dialog-title">
            <span>Apply for this Job</span>

            <button
              type="button"
              className="application-close-button"
              onClick={handleClose}
              aria-label="Close application form"
            >
              ×
            </button>
          </DialogTitle>

          {/* =========================
              SUCCESS STATE
          ========================== */}

          {submitted ? (
            <>
              <DialogContent className="application-dialog-content">
                <div className="application-success">
                  <div className="application-success-icon">
                    ✓
                  </div>

                  <h3>
                    Application submitted successfully!
                  </h3>

                  <p>
                    Your application for{" "}
                    <strong>{jobTitle}</strong> at{" "}
                    <strong>{company}</strong> has been submitted.
                  </p>

                  <p>
                    Your application has been saved successfully.
                  </p>
                </div>
              </DialogContent>

              <DialogActions className="application-dialog-actions">
                <Button
                  appearance="primary"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </DialogActions>
            </>
          ) : (
            <>
              {/* =========================
                  FORM CONTENT
              ========================== */}

              <DialogContent className="application-dialog-content">

                {/* Job Information */}

                <div className="application-job-info">
                  <div className="application-job-title">
                    {jobTitle}
                  </div>

                  <div className="application-company">
                    {company}
                  </div>
                </div>

                {/* Application Form */}

                <div className="application-form">

                  {/* First Name + Last Name */}

                  <div className="application-form-grid">

                    <Field
                      label="First Name"
                      required
                      validationMessage={errors.firstName}
                    >
                      <Input
                        value={firstName}
                        placeholder="Enter your first name"
                        onChange={(_, data) => {
                          setFirstName(data.value);
                          clearError("firstName");
                        }}
                      />
                    </Field>

                    <Field
                      label="Last Name"
                      required
                      validationMessage={errors.lastName}
                    >
                      <Input
                        value={lastName}
                        placeholder="Enter your last name"
                        onChange={(_, data) => {
                          setLastName(data.value);
                          clearError("lastName");
                        }}
                      />
                    </Field>

                  </div>

                  {/* Email */}

                  <Field
                    label="Email"
                    required
                    validationMessage={errors.email}
                  >
                    <Input
                      type="email"
                      value={email}
                      placeholder="example@email.com"
                      onChange={(_, data) => {
                        setEmail(data.value);
                        clearError("email");
                      }}
                    />
                  </Field>

                  {/* Phone */}

                  <Field
                    label="Phone Number"
                    required
                    validationMessage={errors.phone}
                  >
                    <Input
                      type="tel"
                      value={phone}
                      placeholder="Enter your phone number"
                      onChange={(_, data) => {
                        setPhone(data.value);
                        clearError("phone");
                      }}
                    />
                  </Field>

                  {/* Skills */}

                  <Field
                    label="Skills"
                    required
                    validationMessage={errors.skills}
                  >
                    <Input
                      value={skills}
                      placeholder="React, JavaScript, TypeScript..."
                      onChange={(_, data) => {
                        setSkills(data.value);
                        clearError("skills");
                      }}
                    />
                  </Field>

                  {/* About Me - Rich Text Editor */}

                  <Field
                    label="About Me"
                    required
                    validationMessage={errors.aboutMe}
                  >
                    <div
                      className={
                        errors.aboutMe
                          ? "application-quill-error"
                          : "application-quill"
                      }
                    >
                      <ReactQuill
                        theme="snow"
                        value={aboutMe}
                        onChange={(value) => {
                          setAboutMe(value);
                          clearError("aboutMe");
                        }}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </Field>

                </div>
              </DialogContent>

              {/* =========================
                  ACTIONS
              ========================== */}

              <DialogActions className="application-dialog-actions">

                <Button
                  appearance="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  appearance="primary"
                  onClick={handleSubmit}
                >
                  Submit Application
                </Button>

              </DialogActions>
            </>
          )}

        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}