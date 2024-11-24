import { NavLink, useLocation } from "react-router-dom";
import logoImage from "../../assets/images/pageLogo.png";
import { NavigationItem } from "../../types/types";
import styles from "./Header.module.scss";
import { MemoizedLangDropdown } from "../langDropdown/LangDropdown";

interface HeaderProps {
  navItems: NavigationItem[];
}

export const Header = ({ navItems }: HeaderProps) => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img src={logoImage} alt="Page logo image" height={120} width={120} />
      </NavLink>
      <nav>
        <ul className={styles["header__nav-list"]}>
          {navItems.map(({ path, displayText }, index) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={index}
                className={() =>
                  isActive
                    ? styles["header__nav-link--active"]
                    : styles["header__nav-link"]
                }
                to={path}
              >
                {displayText}
              </NavLink>
            );
          })}
        </ul>
      </nav>
      <MemoizedLangDropdown />
    </header>
  );
};
