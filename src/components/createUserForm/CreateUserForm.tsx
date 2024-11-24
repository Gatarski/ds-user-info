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
import { useCallback, useMemo, useState } from "react";
import { MemoizedInfoDialog } from "../InfoDialog/InfoDialog";
import { useModalVisibility, isAvatarImageNotCorrect } from "../../utils/utils";
import { FormValues, InputItem } from "../../types/types";
import { useTranslation } from "react-i18next";

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: "",
  about: "",
  image: undefined,
};

export const CreateUserForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { isVisible, hideModal, showModal } = useModalVisibility();

  const inputsSchema: InputItem[] = useMemo(() => {
    return [
      {
        name: "firstName",
        label: t("createUser.inputs.firstName"),
        type: "string",
        placeholder: "e.g: John",
      },
      {
        name: "lastName",
        label: t("createUser.inputs.lastName"),
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
        label: t("createUser.inputs.phone"),
        type: "number",
        placeholder: "e.g: 48 123 123 123",
      },
      { name: "date", label: t("createUser.inputs.birthday"), type: "date" },
    ];
  }, [t]);

  const useValidationSchema = useCallback(() => {
    return Yup.object({
      firstName: Yup.string()
        .required(t("validations.firstNameReq"))
        .min(2, t("validations.firstNameMin"))
        .max(40, t("validations.firstNameMax")),
      lastName: Yup.string()
        .min(2, t("validations.lastNameMin"))
        .max(40, t("validations.lastNameMin")),
      email: Yup.string()
        .email(t("validations.emailInvalid"))
        .required(t("validations.emailReq"))
        .max(50, "validations.emailMax"),
      phone: Yup.string()
        .required(t("validations.phoneReq"))
        .min(3, t("validations.phoneMin"))
        .max(15, t("validations.phoneMax")),
      date: Yup.date()
        .required(t("validations.birthdayReq"))
        .max(new Date(), t("validations.birthdayMax"))
        .min(new Date("1900-01-01"), t("validations.birthdayMin")),
      about: Yup.string().max(200, t("validations.aboutMax")),
    });
  }, [t]);

  const submitForm = async (values: FormValues) => {
    const data = await backend.createUser(values);

    if (data) {
      navigate("/");
    }
  };
  const validationSchema = useValidationSchema();

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
            <h2>{t("createUser.header")}</h2>
            {inputsSchema.map(({ name, label, type, placeholder }, index) => {
              const nameAsKey = name as keyof FormValues;
              return (
                <Field
                  key={index}
                  placeholder={placeholder}
                  fullWidth
                  name={name}
                  label={label}
                  as={TextField}
                  error={touched[nameAsKey] && Boolean(errors[nameAsKey])}
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
              label={t("createUser.inputs.about")}
              fullWidth
              multiline
              type={"string"}
              rows={4}
              error={touched.about && Boolean(errors.about)}
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
                  {t("buttons.chooseAvatar")}
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
              {t("buttons.createUser")}
            </Button>
            <MemoizedInfoDialog
              headerText={t("createUser.info.header")}
              isOpen={isVisible}
              contentText={t("createUser.info.content")}
              hideDialog={hideModal}
            />
          </Form>
        )
      }
    </Formik>
  );
};
