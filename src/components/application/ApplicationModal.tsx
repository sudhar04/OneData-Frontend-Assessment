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

import AsyncSelect from "react-select/async";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useForm,
} from "@tanstack/react-form";

import { z } from "zod";

import type { ApplicationData } from "../../types/application";

import {
  useApplicationStore,
} from "../../store/applicationStore";

/* =========================================================
   PROPS
========================================================= */

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  jobTitle: string;
  company: string;
  onSubmit?: (application: ApplicationData) => void;
}

/* =========================================================
   SKILL OPTION TYPE
========================================================= */

type SkillOption = {
  value: string;
  label: string;
};

/* =========================================================
   30+ SKILLS
========================================================= */

const SKILL_OPTIONS: SkillOption[] = [
  {
    value: "JavaScript",
    label: "JavaScript",
  },
  {
    value: "TypeScript",
    label: "TypeScript",
  },
  {
    value: "React.js",
    label: "React.js",
  },
  {
    value: "Next.js",
    label: "Next.js",
  },
  {
    value: "Vue.js",
    label: "Vue.js",
  },
  {
    value: "Angular",
    label: "Angular",
  },
  {
    value: "HTML5",
    label: "HTML5",
  },
  {
    value: "CSS3",
    label: "CSS3",
  },
  {
    value: "Tailwind CSS",
    label: "Tailwind CSS",
  },
  {
    value: "Bootstrap",
    label: "Bootstrap",
  },
  {
    value: "Node.js",
    label: "Node.js",
  },
  {
    value: "Express.js",
    label: "Express.js",
  },
  {
    value: "Python",
    label: "Python",
  },
  {
    value: "FastAPI",
    label: "FastAPI",
  },
  {
    value: "Java",
    label: "Java",
  },
  {
    value: "Spring Boot",
    label: "Spring Boot",
  },
  {
    value: "C++",
    label: "C++",
  },
  {
    value: "C#",
    label: "C#",
  },
  {
    value: "SQL",
    label: "SQL",
  },
  {
    value: "MySQL",
    label: "MySQL",
  },
  {
    value: "PostgreSQL",
    label: "PostgreSQL",
  },
  {
    value: "MongoDB",
    label: "MongoDB",
  },
  {
    value: "Git",
    label: "Git",
  },
  {
    value: "GitHub",
    label: "GitHub",
  },
  {
    value: "REST API",
    label: "REST API",
  },
  {
    value: "GraphQL",
    label: "GraphQL",
  },
  {
    value: "Firebase",
    label: "Firebase",
  },
  {
    value: "Supabase",
    label: "Supabase",
  },
  {
    value: "Docker",
    label: "Docker",
  },
  {
    value: "AWS",
    label: "AWS",
  },
  {
    value: "Azure",
    label: "Azure",
  },
  {
    value: "Linux",
    label: "Linux",
  },
  {
    value: "Nginx",
    label: "Nginx",
  },
  {
    value: "Figma",
    label: "Figma",
  },
  {
    value: "Jest",
    label: "Jest",
  },
  {
    value: "Cypress",
    label: "Cypress",
  },
  {
    value: "Playwright",
    label: "Playwright",
  },
];

/* =========================================================
   ASYNC SKILL LOADER
========================================================= */

const loadSkills = async (
  inputValue: string
): Promise<SkillOption[]> => {
  const search =
    inputValue.trim().toLowerCase();

  if (!search) {
    return SKILL_OPTIONS;
  }

  return SKILL_OPTIONS.filter((skill) =>
    skill.label
      .toLowerCase()
      .includes(search)
  );
};

/* =========================================================
   ZOD SCHEMA
========================================================= */

const applicationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(
      1,
      "First name is required."
    ),

  lastName: z
    .string()
    .trim()
    .min(
      1,
      "Last name is required."
    ),

  email: z
    .string()
    .trim()
    .min(
      1,
      "Email is required."
    )
    .email(
      "Enter a valid email address."
    ),

  phone: z
    .string()
    .trim()
    .min(
      7,
      "Enter a valid phone number."
    )
    .max(
      20,
      "Enter a valid phone number."
    )
    .regex(
      /^[0-9+\-\s()]+$/,
      "Enter a valid phone number."
    ),

  skills: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(
      1,
      "Please select at least one skill."
    ),

  aboutMe: z
    .string()
    .refine(
      (value) => {
        const plainText = value
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .trim();

        return plainText.length > 0;
      },
      {
        message:
          "Please tell us about yourself.",
      }
    ),
});

/* =========================================================
   COMPONENT
========================================================= */

export function ApplicationModal({
  open,
  onClose,
  jobTitle,
  company,
  onSubmit,
}: ApplicationModalProps) {
  /* =======================================================
     ZUSTAND
  ======================================================= */

  const addApplication =
    useApplicationStore(
      (state) => state.addApplication
    );

  /* =======================================================
     LOCAL UI STATE
  ======================================================= */

  const [submitted, setSubmitted] =
    useState(false);

  /* =======================================================
     TIPTAP
  ======================================================= */

  const [aboutMe, setAboutMe] =
    useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],

    content: "",

    editorProps: {
      attributes: {
        class:
          "application-editor-content",
      },
    },

    onUpdate: ({
      editor,
    }) => {
      setAboutMe(
        editor.getHTML()
      );
    },
  });

  /* =======================================================
     TANSTACK FORM
  ======================================================= */

  const form =
    useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        skills: [] as SkillOption[],
        aboutMe: "",
      },

      validators: {
        onSubmit: applicationSchema,
      },

      onSubmit: async ({
        value,
      }) => {
        const application: ApplicationData =
          {
            firstName:
              value.firstName.trim(),

            lastName:
              value.lastName.trim(),

            email:
              value.email.trim(),

            phone:
              value.phone.trim(),

            skills:
              value.skills
                .map(
                  (skill) =>
                    skill.value
                )
                .join(", "),

            aboutMe:
              value.aboutMe,
          };

        /* Save in Zustand */

        addApplication(
          application,
          jobTitle,
          company
        );

        /* Parent callback */

        onSubmit?.(application);

        /* Success state */

        setSubmitted(true);
      },
    });

  /* =======================================================
     SYNC ABOUT ME WITH TANSTACK FORM
  ======================================================= */

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (
      aboutMe !==
      form.getFieldValue("aboutMe")
    ) {
      form.setFieldValue(
        "aboutMe",
        aboutMe
      );
    }
  }, [
    aboutMe,
    editor,
    form,
  ]);

  /* =======================================================
     RESET
  ======================================================= */

  const resetForm = () => {
    form.reset();

    setSubmitted(false);

    setAboutMe("");

    if (editor) {
      editor.commands.clearContent();
    }
  };

  /* =======================================================
     CLOSE
  ======================================================= */

  const handleClose = () => {
    resetForm();

    onClose();
  };

  /* =======================================================
     LINK
  ======================================================= */

  const addLink = () => {
    if (!editor) {
      return;
    }

    const previousUrl =
      editor.getAttributes(
        "link"
      ).href;

    const url = window.prompt(
      "Enter URL",
      previousUrl ||
        "https://"
    );

    if (url === null) {
      return;
    }

    if (url === "") {
      editor
        .chain()
        .focus()
        .extendMarkRange(
          "link"
        )
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange(
        "link"
      )
      .setLink({
        href: url,
      })
      .run();
  };

  /* =======================================================
     SELECTED SKILLS
  ======================================================= */

  const selectedSkills =
    form.getFieldValue(
      "skills"
    );

  const selectedSkillValues =
    useMemo(
      () =>
        selectedSkills
          .map(
            (skill) =>
              skill.value
          )
          .join(", "),
      [selectedSkills]
    );

  /* =======================================================
     RENDER
  ======================================================= */

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
          {/* =================================================
              HEADER
          ================================================= */}
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

          {/* =================================================
              SUCCESS
          ================================================= */}
          {submitted ? (
            <>
              <DialogContent className="application-dialog-content application-success-content">
                <div className="application-success">
                  <div className="application-success-icon">✓</div>

                  <h3>Application submitted successfully!</h3>

                  <p>
                    Your application for <strong>{jobTitle}</strong> at{" "}
                    <strong>{company}</strong> has been submitted.
                  </p>

                  <p>Your application has been saved successfully.</p>
                </div>
              </DialogContent>

              <DialogActions className="application-dialog-actions">
                <Button appearance="primary" onClick={handleClose}>
                  Done
                </Button>
              </DialogActions>
            </>
          ) : (
            <>
              {/* =================================================
                  FORM LAYOUT
              ================================================= */}
              <DialogContent className="application-dialog-content application-modal-content">
                <div className="application-modal-layout">
                  {/* =================================================
                      LEFT — JOB INFORMATION
                  ================================================= */}
                  <aside className="application-job-panel">
                    <div className="application-job-logo" aria-hidden="true">
                      {company.trim().charAt(0).toUpperCase() || "J"}
                    </div>

                    <div className="application-job-panel-content">
                      <span className="application-job-panel-label">
                        APPLYING FOR
                      </span>

                      <h2 className="application-job-panel-title">
                        {jobTitle}
                      </h2>

                      <p className="application-job-panel-company">
                        {company}
                      </p>

                      <div className="application-job-panel-divider" />

                      <div className="application-job-panel-section">
                        <span className="application-job-panel-label">
                          APPLICATION
                        </span>
                        <p>
                          Complete your details below to submit your application.
                        </p>
                      </div>

                      <div className="application-job-panel-note">
                        <span className="application-job-panel-note-icon">✓</span>
                        <span>Your information will be saved securely.</span>
                      </div>
                    </div>
                  </aside>

                  {/* =================================================
                      RIGHT — APPLICATION FORM
                  ================================================= */}
                  <div className="application-form-panel">
                    <div className="application-form-panel-header">
                      <h3>Application Details</h3>
                      <p>Fill in the required information to continue.</p>
                    </div>

                    <div className="application-form">
                      {/* =================================================
                          FIRST + LAST NAME
                      ================================================= */}
                      <div className="application-form-grid">
                        <form.Field
                          name="firstName"
                          children={(field) => (
                            <Field
                              label="First Name"
                              required
                              validationMessage={
                                field.state.meta.errors?.[0]?.message
                              }
                            >
                              <Input
                                value={field.state.value}
                                placeholder="Enter your first name"
                                onChange={(_, data) => {
                                  field.handleChange(data.value);
                                }}
                              />
                            </Field>
                          )}
                        />

                        <form.Field
                          name="lastName"
                          children={(field) => (
                            <Field
                              label="Last Name"
                              required
                              validationMessage={
                                field.state.meta.errors?.[0]?.message
                              }
                            >
                              <Input
                                value={field.state.value}
                                placeholder="Enter your last name"
                                onChange={(_, data) => {
                                  field.handleChange(data.value);
                                }}
                              />
                            </Field>
                          )}
                        />
                      </div>

                      {/* =================================================
                          EMAIL
                      ================================================= */}
                      <form.Field
                        name="email"
                        children={(field) => (
                          <Field
                            label="Email"
                            required
                            validationMessage={
                              field.state.meta.errors?.[0]?.message
                            }
                          >
                            <Input
                              type="email"
                              value={field.state.value}
                              placeholder="example@email.com"
                              onChange={(_, data) => {
                                field.handleChange(data.value);
                              }}
                            />
                          </Field>
                        )}
                      />

                      {/* =================================================
                          PHONE
                      ================================================= */}
                      <form.Field
                        name="phone"
                        children={(field) => (
                          <Field
                            label="Phone Number"
                            required
                            validationMessage={
                              field.state.meta.errors?.[0]?.message
                            }
                          >
                            <Input
                              type="tel"
                              value={field.state.value}
                              placeholder="Enter your phone number"
                              onChange={(_, data) => {
                                field.handleChange(data.value);
                              }}
                            />
                          </Field>
                        )}
                      />

                      {/* =================================================
                          SKILLS
                      ================================================= */}
                      <form.Field
                        name="skills"
                        children={(field) => (
                          <Field
                            label="Skills"
                            required
                            validationMessage={
                              field.state.meta.errors?.[0]?.message
                            }
                          >
                            <AsyncSelect
                              isMulti
                              cacheOptions
                              defaultOptions={SKILL_OPTIONS}
                              loadOptions={loadSkills}
                              value={field.state.value}
                              onChange={(value) => {
                                field.handleChange([...value]);
                              }}
                              placeholder="Search and select your skills..."
                              closeMenuOnSelect={false}
                              isClearable
                              noOptionsMessage={() => "No skills found"}
                              loadingMessage={() => "Searching skills..."}
                              className="application-skills-select"
                              classNamePrefix="skills-select"
                            />

                            <input
                              type="hidden"
                              value={selectedSkillValues}
                              readOnly
                              aria-hidden="true"
                            />
                          </Field>
                        )}
                      />

                      {/* =================================================
                          ABOUT ME
                      ================================================= */}
                      <form.Field
                        name="aboutMe"
                        children={(field) => (
                          <Field
                            label="About Me"
                            required
                            validationMessage={
                              field.state.meta.errors?.[0]?.message
                            }
                          >
                            <div className="application-rich-text">
                              <div className="application-editor-toolbar">
                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("bold")
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleBold()
                                      .run()
                                  }
                                >
                                  <strong>B</strong>
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("italic")
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleItalic()
                                      .run()
                                  }
                                >
                                  <em>I</em>
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("underline")
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleUnderline()
                                      .run()
                                  }
                                >
                                  <u>U</u>
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("strike")
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleStrike()
                                      .run()
                                  }
                                >
                                  <s>S</s>
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("heading", { level: 1 })
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleHeading({ level: 1 })
                                      .run()
                                  }
                                >
                                  H1
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("heading", { level: 2 })
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleHeading({ level: 2 })
                                      .run()
                                  }
                                >
                                  H2
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("bulletList")
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleBulletList()
                                      .run()
                                  }
                                >
                                  • List
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("orderedList")
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .toggleOrderedList()
                                      .run()
                                  }
                                >
                                  1. List
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance={
                                    editor?.isActive("link")
                                      ? "primary"
                                      : "subtle"
                                  }
                                  onClick={addLink}
                                >
                                  Link
                                </Button>

                                <Button
                                  type="button"
                                  size="small"
                                  appearance="subtle"
                                  onClick={() =>
                                    editor
                                      ?.chain()
                                      .focus()
                                      .unsetAllMarks()
                                      .clearNodes()
                                      .run()
                                  }
                                >
                                  Clear
                                </Button>
                              </div>

                              <EditorContent editor={editor} />
                            </div>
                          </Field>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>

              {/* =================================================
                  ACTIONS
              ================================================= */}
              <DialogActions className="application-dialog-actions">
                <Button
                  type="button"
                  appearance="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  appearance="primary"
                  onClick={() => form.handleSubmit()}
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
