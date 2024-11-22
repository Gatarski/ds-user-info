import { Card } from "../components/card/Card";
import { InfoCard } from "../components/infoCard/InfoCard";

export const About = () => {
  return (
    <Card>
      <InfoCard
        headerText="About page"
        contentText="This is simple page where you can create user and see its profile. There is no backend."
      />
    </Card>
  );
};
