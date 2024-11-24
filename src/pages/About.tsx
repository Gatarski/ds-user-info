import { useTranslation } from "react-i18next";
import { Card } from "../components/card/Card";
import { InfoCard } from "../components/infoCard/InfoCard";

export const About = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <InfoCard
        headerText={t('about.header')}
        contentText={t('about.content')}
      />
    </Card>
  );
};
