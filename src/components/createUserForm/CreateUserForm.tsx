import {
  Button,
  CircularProgress,
  TextField,
  FormControl,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import styles from "./CreateUserForm.module.scss";
import * as Yup from "yup";
import backend from "../../services/backend";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InfoDialog } from "../InfoDialog/InfoDialog";
import { useModalVisibility, isAvatarImageNotCorrect } from "../../utils/utils";
import { FormValues } from "../../types/types";

type InputSchema = {
  name: string;
  label: string;
  type: "string" | "number" | "date";
  placeholder?: string;
};

const INPUTS_SCHEMA: InputSchema[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "string",
    placeholder: "e.g: John",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "string",
    placeholder: "e.g: Doe",
  },
  {
    name: "email",
    label: "Email",
    type: "string",
    placeholder: "e.g: test@dummy.com",
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
    placeholder: "e.g: 48 123 123 123",
  },
  { name: "date", label: "Birthday", type: "date" },
];

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(40, "First Name can be max 40 characters"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(40, "Last Name can be max 40 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .max(50, "Email can be max 50 characters"),
  phone: Yup.string()
    .required("Phone is required")
    .min(3, "Phone must be at least 3 numbers")
    .max(15, "Phone can be max 15 numbers"),
  date: Yup.date().required("Birthday is required"),
  about: Yup.string().max(200, "About can be max 200 characters"),
});

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: undefined,
  about: "",
  image: undefined,
};

export const CreateUserForm = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { isVisible, hideModal, showModal } = useModalVisibility();

  const submitForm = async (values: FormValues) => {
    const data = await backend.createUser(values);

    if (data) {
      navigate("/");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitForm}
    >
      {({ setFieldValue, errors, touched, isValid, isSubmitting }) =>
        isSubmitting ? (
          <CircularProgress />
        ) : (
          <Form className={styles["create-user-form"]}>
            <h1>Please fill this form to create user.</h1>
            {INPUTS_SCHEMA.map(({ name, label, type, placeholder }, index) => {
              const nameAsKey = name as keyof FormValues;
              return (
                <Field
                  key={index}
                  placeholder={placeholder}
                  fullWidth
                  name={name}
                  label={label}
                  as={TextField}
                  error={touched[nameAsKey] && errors[nameAsKey]}
                  helperText={touched[nameAsKey] && errors[nameAsKey]}
                  type={type}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              );
            })}
            <Field
              placeholder="e.g.: My name is John Doe. I like trains."
              as={TextField}
              name="about"
              label="About"
              fullWidth
              multiline
              type={"string"}
              rows={4}
              error={touched.about && errors.about}
              helperText={touched.about && errors.about}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <FormControl fullWidth>
              <input
                id="image-upload"
                name="image"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  const isFileNotCorrect = isAvatarImageNotCorrect(file);
                  if (isFileNotCorrect) {
                    showModal();
                    return;
                  }

                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result as string;
                      setFieldValue("image", base64String);
                      setAvatarPreview(base64String);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label htmlFor="image-upload">
                <Button fullWidth variant="outlined" component="span">
                  Choose Avatar
                </Button>
              </label>
              {avatarPreview && (
                <div>
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  />
                </div>
              )}
            </FormControl>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
            >
              Create user
            </Button>
            <InfoDialog
              headerText="Incorrect file"
              isOpen={isVisible}
              contentText="Maximum file size is 2 MB. Allowed formats: .jpeg, .png, .gif, .webp."
              hideDialog={hideModal}
            />
          </Form>
        )
      }
    </Formik>
  );
};
