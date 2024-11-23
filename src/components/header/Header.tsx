import { NavLink } from "react-router-dom";
import logoImage from "../../assets/images/pageLogo.png";
import { NavigationItem } from "../../types/types";
import styles from "./Header.module.scss";

interface HeaderProps {
  navItems: NavigationItem[];
}

export const Header = ({ navItems }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img src={logoImage} alt="Page logo image" height={120} width={120} />
      </NavLink>
      <nav>
        <ul className={styles["header__nav-list"]}>
          {navItems.map(({ path, name }, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive
                  ? styles["header__nav-link--active"]
                  : styles["header__nav-link"]
              }
              to={path}
            >
              {name}
            </NavLink>
          ))}
        </ul>
      </nav>
      <div>select language</div>
    </header>
  );
};
