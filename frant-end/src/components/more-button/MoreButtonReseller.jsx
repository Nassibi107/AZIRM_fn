import { useState } from "react";
import { Box, Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENT
import ModalEditReseller from "../modal/ModalEditReseller";
import ModalGeneratePinReseller from "../modal/ModalGeneratePinReseller"

const StyledIconButton = styled(IconButton)(({
  theme
}) => ({
  flexShrink: 0,
  color: theme.palette.grey[isDark(theme) ? 300 : 400]
}));
const optionList = ["Edit", "Tree" , "Generate PIN"]; // ==============================================================

// ==============================================================
const MoreButtonReseller = ({
    size = "large",
    options = optionList,
    id , 
    full_name , 
    email , 
    dns , 
    note , 
    whatsapp , 
    adult , 
    role ,
    fetshUsers,
    renderOptions,
    ...props
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => setAnchorEl(null);

    // Modal
    const [ openEditReseller , setOpenEditReseller ] = useState(false)
    const [ openGeneratePinReseller , setOpenGeneratePinReseller ] = useState(false)

    const handleOptionClick = (option) => {
        if (option === "Edit") {
            setOpenEditReseller(true)
        } else if ( option === "Generate PIN" ) {
          setOpenGeneratePinReseller(true)
        }
        handleClose();
    }

    const handleCloseEditReseller = () => {
        setOpenEditReseller(false)
    }
    const handleCloseGeneratePinReseller = () => {
      setOpenGeneratePinReseller(false)
    }

  return <Box>
      <StyledIconButton size={size} aria-label="more" aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)} {...props}>
        <MoreVert fontSize="small" />
      </StyledIconButton>

      <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)} TransitionComponent={Fade}>
        {renderOptions ? (
            renderOptions(handleClose)
            ) : (
            options.map((option) => (
                <MenuItem key={option} onClick={() => handleOptionClick(option)}>
                    {option}
                </MenuItem>
            ))
        )}
      </Menu>
      {openEditReseller && 
        <ModalEditReseller
          open={openEditReseller}
          handleClose={handleCloseEditReseller}
          id = {id}
          full_name = {full_name}
          email = {email}
          dns = {dns}
          note = {note}
          whatsapp = {whatsapp}
          adult = {adult}
          role= {role}
          fetshUsers={fetshUsers}
        />
      }
      {openGeneratePinReseller && 
        <ModalGeneratePinReseller
          id={id}
          fetshUsers={fetshUsers}
          open={openGeneratePinReseller}
          handleClose={handleCloseGeneratePinReseller}
        />
      }
    </Box>;
};

export default MoreButtonReseller;