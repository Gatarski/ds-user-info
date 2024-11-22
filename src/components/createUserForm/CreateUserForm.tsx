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

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
};

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
    .min(2, "First Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.number()
    .required("Phone is required")
    .min(2, "Phone must be at least 5 numbers"),
  date: Yup.date().required("Birthday is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: null,
  about: "",
  image: null,
};

export const CreateUserForm = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { isVisible, hideModal, showModal } = useModalVisibility();

  const submitForm = async (values: any) => {
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
            {INPUTS_SCHEMA.map(({ name, label, type, placeholder }) => {
              const nameAsKey = name as keyof FormValues;
              return (
                <Field
                  placeholder={placeholder}
                  fullWidth
                  name={name}
                  label={label}
                  as={TextField}
                  error={touched[nameAsKey] && errors[nameAsKey]}
                  helperText={touched[nameAsKey] && errors[nameAsKey]}
                  type={type}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              );
            })}
            <Field
              placeholder="e.g.: My name is John Doe. I like trains."
              component={TextField}
              name="about"
              label="About"
              fullWidth
              multiline
              rows={4}
              error={touched.about && Boolean(errors.about)}
              helperText={touched.about && errors.about}
              InputLabelProps={{
                shrink: true,
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
                  setFieldValue("image", file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () =>
                      setAvatarPreview(reader.result as string);
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
