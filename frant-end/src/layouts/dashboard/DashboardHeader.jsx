import { Fragment, useContext, useState } from "react";
import { Box, IconButton, styled, Switch, useMediaQuery } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener"; // LAYOUT BASED HOOK

import useLayout from "./context/useLayout"; // SITE SETTINGS CONTEXT FILE

import { SettingsContext } from "@/contexts/settingsContext"; // CUSTOM ICON COMPONENTS

import Menu from "@/icons/Menu";
import MenuLeft from "@/icons/MenuLeft";
import ThemeIcon from "@/icons/ThemeIcon"; // import SearchIcon from "@/icons/SearchIcon";

import Search from "@/icons/duotone/Search";
import MenuLeftRight from "@/icons/MenuLeftRight"; // CUSTOM COMPONENTS

import SearchBar from "../layout-parts/SearchBar";
import ProfilePopover from "../layout-parts/popovers/ProfilePopover";

import LanguagePopover from "../layout-parts/popovers/LanguagePopover";
import NotificationsPopover from "../layout-parts/popovers/NotificationsPopover"; // STYLED COMPONENTS

import { DashboardHeaderRoot, StyledToolBar } from "../layout-parts/styles/header";
import SwitchMode from "@/components/SwitchMode/SwitchMode";


const DashboardHeader = () => {
  const {
    handleOpenMobileSidebar
  } = useLayout();
  const [openSearchBar, setSearchBar] = useState(false);
  const {
    settings,
    saveSettings
  } = useContext(SettingsContext);
  const upSm = useMediaQuery(theme => theme.breakpoints.up("sm"));
  const downMd = useMediaQuery(theme => theme.breakpoints.down(1200));

  const handleChangeDirection = value => {
    saveSettings({ ...settings,
      direction: value
    });
  };

  const handleChangeTheme = value => {
    saveSettings({ ...settings,
      theme: value
    });
  };

  return <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        {
        /* SMALL DEVICE SIDE BAR OPEN BUTTON */
      }
        {downMd && <IconButton onClick={handleOpenMobileSidebar}>
            <Menu />
          </IconButton>}

        {
        /* SEARCH ICON BUTTON */
      }
          
        <Box flexGrow={1} ml={1} />

        {
        /* TEXT DIRECTION SWITCH BUTTON */
      }
        {settings.direction === "rtl" ? <IconButton onClick={() => handleChangeDirection("ltr")}>
            <MenuLeft sx={{
          color: "grey.400"
        }} />
          </IconButton> : <IconButton onClick={() => handleChangeDirection("rtl")}>
            <MenuLeftRight sx={{
          color: "grey.400"
        }} />
          </IconButton>}

        {
        /* THEME SWITCH BUTTON */
      }
        <SwitchMode onClick={() => {
        handleChangeTheme(settings.theme === "light" ? "dark" : "light");
      }}>
        </SwitchMode>
        {upSm && <Fragment>
            <LanguagePopover />
            <NotificationsPopover />
          </Fragment>}
          
        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>;
};

export default DashboardHeader;
