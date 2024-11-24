import { Button } from "@mui/material";
import { InfoCard } from "../../infoCard/InfoCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const NoProfileData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate("/create-user");
  };

  return (
    <div>
      <InfoCard
        headerText={t("profile.noData.header")}
        contentText={t("profile.noData.content")}
      />
      <Button variant="contained" color="primary" onClick={handleRedirection}>
        {t("buttons.goToCreate")}
      </Button>
    </div>
  );
};
