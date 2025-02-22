import { Fragment, useRef, useState } from "react";
import { Box, styled, Avatar, Divider, ButtonBase, Button, Snackbar, SnackbarContent, Slide } from "@mui/material"; // CUSTOM COMPONENTS

import PopoverLayout from "./PopoverLayout";
import { FlexBox } from "@/components/flexbox";
import { AvatarLoading } from "@/components/avatar-loading";
import { H6, Paragraph, Small } from "@/components/typography"; // CUSTOM DEFINED HOOK
import { getModeComplex, getModeSimple } from "@/___GlobalState__/Sil/ModeSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ModeSelectors } from '@/___GlobalState__/Selectors/ModeSelectors';
import useAuth from "@/hooks/useAuth";
import useNavigate from "@/hooks/useNavigate"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENTS
 
import Smp from "../../../icons/simpleMode.svg"
import Cmp from "../../../icons/comlexMode.svg"
import FlexAround from "../../../components/flexbox/FlexAround";

const StyledButtonBase = styled(ButtonBase)(({
  theme
}) => ({
  marginLeft: 8,
  borderRadius: 30,
  border: `1px solid ${theme.palette.grey[isDark(theme) ? 800 : 200]}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));
const StyledSmall = styled(Paragraph)(({
  theme
}) => ({
  fontSize: 13,
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));

const ProfilePopover = () => {
  const Mode = useSelector(ModeSelectors);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleModeSimpleClick = () => {
    dispatch(getModeSimple());
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    setSnackbarMessage('Switched to Simple Mode');
    setSnackbarOpen(true);
  };
  
  const handleModeComplexClick = () => {
    dispatch(getModeComplex());
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    setSnackbarMessage('Switched to Complex Mode');
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const {
    logout ,user
  } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuItem = path => () => {
    navigate(path);
    setOpen(false);
  };
 const onLogout =  () => {
 
  logout();
 }
  return (
    <Fragment>
      <StyledButtonBase ref={anchorRef} onClick={() => setOpen(true)}>
        <AvatarLoading alt="user" percentage={60} src="/static/user/user-11.png" sx={{
          width: 35,
          height: 35
        }} />
      </StyledButtonBase>
      <Slide direction="down" in={snackbarOpen} mountOnEnter unmountOnExit>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#1976d2',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '4px'
            }}
            message={snackbarMessage}
          />
        </Snackbar>
      </Slide>
      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center" gap={1}>
            <Avatar src="/static/user/user-11.png" sx={{ width: 35, height: 35 }} />
            <Box>
              <H6 fontSize={14}>{user.firstName || "yassine"}</H6>
              {/* <Small color="text.secndary" display="block">
                aaron@example.com
              </Small> */}
            </Box>
          </FlexBox>
        }
        sx={{ textAlign: "center" }} // Ajout de la propriété de style textAlign
      >
        <Box pt={1}>
          {/* <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>Set Status</StyledSmall>

          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>
            Profile & Account
          </StyledSmall> */}

          <Box sx={{fontSize: "13",display: "block", cursor: "pointer",padding: "5px 1rem"}} >
          

          </Box>
          <Divider sx={{ my: 1 }} />

          {/* <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>Manage Team</StyledSmall> */}
          <StyledSmall onClick={handleMenuItem("/account")}>Settings</StyledSmall>
          <Divider sx={{ my: 1 }} />
          <StyledSmall onClick={()=>onLogout()}>Sign Out</StyledSmall>

        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
