import React, { useState } from "react";
import {
    Box,
    Fade,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Modal,
    Typography,
    TextField,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";

import { isDark } from "@/utils/constants";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const   ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const StyledIconButton = styled(IconButton)(({ theme }) => ({
    flexShrink: 0,
    color: theme.palette.grey[isDark(theme) ? 300 : 400],
}));

const optionList = [
    "Edit",
    "Delete",
];

const MoreButtonTri = ({
    user,
    options = optionList,
    renderOptions,
    ...props
}) => {
   
    const [isDelete, setIsDelete] = useState(false);
    const [isPriview, setIsPriview] = useState(false);
const [isRefund, setIsRefund] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => setAnchorEl(null);
    const navigate = useNavigate();
    const handleOptionClick = (option) => {
        console.log(option);
        if (option === "Edit") {
          navigate(`/user-add/${user.id}`);
        }else if (option === "Delete") {
            setIsDelete(true);
        }

        handleClose();
    };

    const handleModalOpen = () => {
        if (isDelete)
             setIsDelete(false);
    };
    const handleDialogClose = () => {
        setIsDelete(false);
    };

    const handleDeleteUser = async (id) => {
      try {
        const res = await axios.delete(`${ADMIN_ROUTE}/user/${user.id}`);
        console.log(res);

      } catch (error) {
        console.error(error);
    };
  }

      const handleConfirmDelete = () => {
        console.log({"delete" : user.id});
        handleDeleteUser(user.id);
        setIsDelete(false);
      };

    return (
        <Box>
            <StyledIconButton
                // size={size}
                aria-label="more"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                {...props}
            >
                <MoreVert fontSize="small" />
            </StyledIconButton>

            <Menu
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}
                TransitionComponent={Fade}
            >
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
    <Dialog
        open={isDelete}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to  delete  this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    
        </Box>
    );
};

export default MoreButtonTri;
