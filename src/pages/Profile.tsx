import { useEffect, useState } from "react";
import backend from "../services/backend";
import { Card } from "../components/card/Card";
import { CircularProgress } from "@mui/material";
import { FormValues } from "../types/types";
import { ProfileView } from "../components/profileView/ProfileView";
import { NoProfileData } from "../components/profileView/noPorfileData/NoProfileData";

export const Profile = () => {
  const [user, setUser] = useState<FormValues | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const data = await backend.getUser();
      setUser(data);
      setIsLoading(false);
    };

    fetchUser();
  }, []);
  console.log(user, "user");
  return (
    <Card>
      {isLoading ? (
        <CircularProgress />
      ) : !user ? (
        <NoProfileData />
      ) : (
        <ProfileView data={user} />
      )}
    </Card>
  );
};
