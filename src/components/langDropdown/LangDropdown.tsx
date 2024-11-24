import React, { memo, useMemo, useState } from "react";
import { IconButton, MenuItem, Menu } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./LangDropdown.module.scss";
import LanguageIcon from "@mui/icons-material/Language";
import { LangItem } from "../../types/types";

const LangDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();

  const langItems: LangItem[] = useMemo(() => {
    return [
      { value: "en", label: t("lang.en") },
      { value: "pl", label: t("lang.pl") },
      { value: "de", label: t("lang.de") },
      { value: "es", label: t("lang.es") },
    ];
  }, [t]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  return (
    <div className={styles.lang}>
      <IconButton onClick={handleClick}>
        <LanguageIcon className={styles["lang__icon"]} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {langItems.map(({ value, label }, index) => {
          return (
            <MenuItem key={index} onClick={() => handleLanguageChange(value)}>
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export const MemoizedLangDropdown = memo(LangDropdown);
