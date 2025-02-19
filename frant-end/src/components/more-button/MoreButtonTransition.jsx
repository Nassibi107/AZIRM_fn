import { useState } from "react";
import { Box, Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENT
import ModalCreateTransaction from "../modal/ModalCreateTransaction";
import ModalRefoundTransaction from "../modal/ModalRefoundTransaction"

const StyledIconButton = styled(IconButton)(({
  theme
}) => ({
  flexShrink: 0,
  color: theme.palette.grey[isDark(theme) ? 300 : 400]
}));
const optionList = ["Create", "Refound"]; // ==============================================================

// ==============================================================
const MoreButtonTransition = ({
    size = "large",
    options = optionList,
    renderOptions,
    ...props
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => setAnchorEl(null);

    // Modal
    const [ openCreateTransaction , setOpenCreateTransaction ] = useState(false)
    const [ openRefoundTransaction , setOpenRefoundTransaction ] = useState(false)

    const handleOptionClick = (option) => {
        if (option === "Create") {
            setOpenCreateTransaction(true)
        } else {
            setOpenRefoundTransaction(true)
        }
        handleClose();
    }

    const handleCloseCreateTransaction = () => {
        setOpenCreateTransaction(false)
    }
    const handleCloseRefoundTransaction = () => {
        setOpenRefoundTransaction(false)
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
      {openCreateTransaction && 
        <ModalCreateTransaction
          open={openCreateTransaction}
          handleClose={handleCloseCreateTransaction}
        />
      }
      {openRefoundTransaction && 
        <ModalRefoundTransaction
          open={openRefoundTransaction}
          handleClose={handleCloseRefoundTransaction}
        />
      }
    </Box>;
};

export default MoreButtonTransition;