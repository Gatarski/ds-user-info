import { Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Contact } from "./pages/Contact";
import { Header } from "./components/header/Header";
import { NavigationItem, PageComponentName } from "./types/types";
import { useMemo } from "react";
import { Footer } from "./components/footer/Footer";
import { CreateUser } from "./pages/CreateUser";
import styles from "./App.module.scss";
import { useTranslation } from "react-i18next";
import { NotFoundPage } from "./components/notFoundPage/NotFoundPage";

const getPageComponentByName = ({ name }: { name: PageComponentName }) => {
  const componentMap = useMemo(
    () => ({
      "Create User": CreateUser,
      Profile,
      Contact,
    }),
    []
  );
  return componentMap[name];
};

function App() {
  const { t } = useTranslation();

  const navItems = useMemo((): NavigationItem[] => {
    return [
      {
        path: "/",
        name: "Profile",
        displayText: t("header.profile"),
      },
      {
        path: "/create-user",
        name: "Create User",
        displayText: t("header.createUser"),
      },
      {
        path: "/contact",
        name: "Contact",
        displayText: t("header.contact"),
      },
    ];
  }, [t]);

  return (
    <div className={styles["app-container"]}>
      <Header navItems={navItems} />
      <div className={styles["app-container__content"]}>
        <Routes>
          {navItems.map(({ path, name }, index) => (
            <Route
              key={index}
              path={path}
              Component={getPageComponentByName({ name })}
            />
          ))}
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
