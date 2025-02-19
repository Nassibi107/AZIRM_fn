import { Box, styled } from "@mui/material"; // LAYOUT BASED HOOK

import useLayout from "./context/useLayout"; // CUSTOM COMPONENTS

import { Scrollbar } from "@/components/scrollbar";
import MultiLevelMenu from "./MultiLevelMenu";
import UserAccount from "../layout-parts/UserAccount";
import LayoutDrawer from "../layout-parts/LayoutDrawer"; // STYLED COMPONENTS
import { ModeSelectors } from "@/___GlobalState__/Selectors/ModeSelectors";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const NavWrapper = styled(Box)({
  height: "100%",
  paddingLeft: 16,
  paddingRight: 16
});

const MobileSidebar = () => {
  const Mode = useSelector(ModeSelectors);
  const dispatch = useDispatch();

  const [chmod ,  setChmod] = useState(Mode);
  useEffect (() => setChmod(Mode) , [Mode] );
  const {
    showMobileSideBar,
    handleCloseMobileSidebar
  } = useLayout();
  return <LayoutDrawer open={showMobileSideBar} onClose={handleCloseMobileSidebar}>
      <Scrollbar autoHide clickOnTrack={false} sx={{
      overflowX: "hidden",
      height: "100%"
    }}>
        <NavWrapper>
          <Box pl={1} pt={3} alt="logo" maxWidth={45} component="img" src="/static/logo/logo-svg.svg" />

          {
          /* NAVIGATION ITEMS */
        }
          
            <MultiLevelMenu mode={chmod} sidebarCompact={false} /> 
            
          {
          /* USER ACCOUNT INFORMATION */
        }
          <UserAccount />
        </NavWrapper>
      </Scrollbar>
    </LayoutDrawer>;
};

export default MobileSidebar;