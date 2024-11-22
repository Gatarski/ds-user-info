import { useEffect, useState } from "react";
import backend from "../services/backend";
import { Card } from "../components/card/Card";
import { InfoCard } from "../components/infoCard/InfoCard";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate("/create-user");
  };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const data = await backend.getUser();
      setUser(data as any);
      setIsLoading(false);
    };

    fetchUser();
  }, []);
  console.log(user, "user");
  return (
    <Card>
      {isLoading ? (
        <CircularProgress />
      ) : (
        !user && (
          <div>
            <InfoCard
              headerText="You don't have any user."
              contentText="To see the profile, you need to create a user first."
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRedirection}
            >
              Create User
            </Button>
          </div>
        )
      )}
    </Card>
  );
};
