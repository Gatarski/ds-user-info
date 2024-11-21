import { useEffect, useState } from "react";
import backend from "../services/backend";
import { Card } from "../components/card/Card";
import { NoData } from "../components/noData/NoData";

export const Profile = () => {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await backend.getUser();
      setUser(data);
    };

    fetchUser();
  }, []);

  return <Card>{!user && <NoData />}</Card>;
};
