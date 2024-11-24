import { useTranslation } from "react-i18next";
import { Card } from "../components/card/Card";
import { InfoCard } from "../components/infoCard/InfoCard";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <InfoCard
        headerText={t("header.contact")}
        contentText="Email: gatarskigrzegorz@gmail.com"
      />
    </Card>
  );
};
