import { Divider } from "@mui/material";
import { FormValues, ProfileViewItem } from "../../types/types";
import { ImageContent } from "./imageContent/ImageContent";
import styles from "./ProfileView.module.scss";
import { TextContent } from "./textContent/TextContent";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface ProfileViewProps {
  data: FormValues;
}

export const ProfileView = ({ data }: ProfileViewProps) => {
  const { firstName, lastName, email, phone, date, about, image } = data;
  const { t } = useTranslation();

  const dataSchema = useMemo((): ProfileViewItem[] => {
    return [
      { label: t("profile.aboutYou"), textContent: about },
      { label: t("profile.birthday"), textContent: date },
      { label: "Email", textContent: email },
      { label: t("profile.phoneNumber"), textContent: phone },
    ];
  }, [t]);

  return (
    <div className={styles["profile-view"]}>
      <div className={styles["profile-view__element"]}>
        <h2>{t("profile.header")}</h2>
        <Divider />
        <ImageContent imageString={image} />
        <TextContent
          label={t("profile.name")}
          content={`${firstName} ${lastName ? lastName : ""}`}
        />
        <Divider />
      </div>
      <div className={styles["profile-view__element"]}>
        {dataSchema.map(({ label, textContent }, index) => {
          const isLastElement = index === dataSchema.length - 1;
          return (
            <div key={index}>
              <TextContent
                label={label}
                content={`${textContent ? textContent : "-"}`}
                height={`${label === "About you" ? "115px" : "auto"}`}
              />
              {!isLastElement && <Divider />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
