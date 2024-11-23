import { Divider } from "@mui/material";
import { FormValues } from "../../types/types";
import { ImageContent } from "./imageContent/ImageContent";
import styles from "./ProfileView.module.scss";
import { TextContent } from "./textContent/TextContent";

interface ProfileViewProps {
  data: FormValues;
}

export const ProfileView = ({ data }: ProfileViewProps) => {
  const { firstName, lastName, email, phone, date, about, image } = data;
  const DATA_SCHEMA = [
    { label: "About you", textContent: about },
    { label: "Birthday", textContent: date },
    { label: "Email", textContent: email },
    { label: "Phone number", textContent: phone },
  ];

  return (
    <div className={styles["profile-view"]}>
      <div className={styles["profile-view__element"]}>
        <ImageContent imageString={image} />
        <TextContent
          label={"Name"}
          content={`${firstName} ${lastName ? lastName : ""}`}
        />
      </div>
      <div className={styles["profile-view__element"]}>
        {DATA_SCHEMA.map(({ label, textContent }, index) => {
          const isLastElement = index === DATA_SCHEMA.length - 1;
          return (
            <>
              <TextContent
                label={label}
                content={`${textContent ? textContent : "-"}`}
                height={`${label === "About you" ? "75px" : "auto"}`}
              />
              {!isLastElement && <Divider />}
            </>
          );
        })}
      </div>
    </div>
  );
};
