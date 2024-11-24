import { useTranslation } from "react-i18next";
import { Card } from "../card/Card";
import { InfoCard } from "../infoCard/InfoCard";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <InfoCard
        headerText={t("notFoundPage.header")}
        contentText={t("notFoundPage.content")}
      />
    </Card>
  );
};
