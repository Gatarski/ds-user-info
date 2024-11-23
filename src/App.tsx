import { Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Header } from "./components/header/Header";
import { NavigationItem, PageComponentName } from "./types/types";
import { useMemo } from "react";
import { Footer } from "./components/footer/Footer";
import { CreateUser } from "./pages/CreateUser";
import styles from "./App.module.scss";

const NAV_ITEMS: NavigationItem[] = [
  { path: "/", name: "Profile" },
  { path: "/create-user", name: "Create User" },
  { path: "/about", name: "About" },
  { path: "/contact", name: "Contact" },
];

const getPageComponentByName = ({ name }: { name: PageComponentName }) => {
  const componentMap = useMemo(
    () => ({
      "Create User": CreateUser,
      Profile,
      About,
      Contact,
    }),
    []
  );
  return componentMap[name];
};

function App() {
  return (
    <div className={styles["app-container"]}>
      <Header navItems={NAV_ITEMS} />
      <div className={styles["app-container__content"]}>
        <Routes>
          {NAV_ITEMS.map(({ path, name }, index) => (
            <Route key={index} path={path} Component={getPageComponentByName({ name })} />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
