import { Button } from "@mui/material";
import { InfoCard } from "../../infoCard/InfoCard";
import { useNavigate } from "react-router-dom";

export const NoProfileData = () => {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate("/create-user");
  };

  return (
    <div>
      <InfoCard
        headerText="You don't have any user."
        contentText="To see the profile, you need to create a user first."
      />
      <Button variant="contained" color="primary" onClick={handleRedirection}>
        Create User
      </Button>
    </div>
  );
};
