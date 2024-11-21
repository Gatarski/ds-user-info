import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const NoData = () => {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate("/create-user");
  };
  return (
    <div>
      <h1>You don't have any user.</h1>
      <p>To see the profile, you need to create a user first.</p>
      <Button variant="contained" color="primary" onClick={handleRedirection}>
        Create User
      </Button>
    </div>
  );
};
