import React, { useEffect, useState } from "react";
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
import axios from 'axios';
import Cookies from 'js-cookie';
import { isDark } from "@/utils/constants";
import ModalDownloadPlaylist from "../modal/ModalDownloadPlaylist";
import PreviewModal from "../modal/PreveiwModal";
import ModalExpend from "../modal/ModalExpend";
import { useNavigate } from "react-router-dom";
import RefunModal from "../modal/RefunModal";
import qs from 'qs';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    flexShrink: 0,
    color: theme.palette.grey[isDark(theme) ? 300 : 400],
}));

const optionList = [
    "Edit",
    "Download Playlist",
    "Disable",
    "Ban As Admin",
    "Preview",
    "Extend",
    "Delete",
    "Logs",
    "Genarate password",
    "Genarate username",
    "Refunds",
];


const MoreButtonManageLine = ({
    typeS,
    item,
    id,
    username,
    password,
    dns,
    size = "large",
    options = optionList,
    renderOptions,
    ...props
}) => {

  const [packagesGet, setPackagesGet] = useState([]);

  useEffect(() => {
      const fetchPackages = async () => {
        try {
          const response = await axios.get(import.meta.env.VITE_LV_URL + '/packages', {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${Cookies.get("accessToken")}`,
            },
          });
          // console.log(response.data.data);
          setPackagesGet(response.data.data);
        } catch (error) {
          console.error('An error occurred while fetching packages:', error);
        }
      };
      

      fetchPackages();
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
    const [isBanAsAminOpen, setIsBanAsAminOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isPriview, setIsPriview] = useState(false);
    const [isExtend, setIsExtend] = useState(false);
    const [isRefunds, setIsRefunds] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isPass, setIsPass] = useState(false);
    const handleClose = () => setAnchorEl(null);
    const navigate = useNavigate();
    const handleOptionClick = (option) => {
        console.log(option);
        if (option === "Edit") {
          navigate(`/edit-line/${id}`);
        } else if (option === "Download Playlist") {
            setIsDownloadModalOpen(true);
        } else if (option === "Disable") {
            setIsDisableModalOpen(true);
        } else if (option === "Ban As Admin") {
            setIsBanAsAminOpen(true);
        }
        else if (option === "Delete") {
            setIsDelete(true);
        }
        else if (option === "Extend") {
           setIsExtend(true);
        }
        else if (option === "Preview") {
           setIsPriview(true);
        }
        else if (option === "Logs") {
            navigate("/logs-line/id=xxxx");
        }
        else if (option === "Refunds") {
           setIsRefunds(true);
        }
        else if (option === "Genarate password") {
          setIsPass(true);
       }
       else if (option === "Genarate username") {
          setIsUser(true);
       }
        handleClose();
    };


    const handleDownloadModalClose = () => {
        setIsDownloadModalOpen(false);
    };
    const handlePreview = () => {
        setIsPriview(false);
    };
    const handleModalOpen = () => {
        if (isRefunds)
            setIsRefunds(false);
        else if (isBanAsAminOpen)
             setIsBanAsAminOpen(false);
        else if (isDelete)
             setIsDelete(false);
        else if (isExtend)
          setIsExtend(false);
        else if (isUser)
          setIsExtend(false);
        else if (isPass)
          setIsPass(false);

    };
    const handleDialogClose = () => {
        setIsDisableModalOpen(false);
        setIsBanAsAminOpen(false);
        setIsDelete(false);
        setIsUser(false);
        setIsPass(false);
      };

      async function sendPostRequest(newUseName) {
        try {
            const response = await axios.post(import.meta.env.VITE_LV_URL + '/CHMOD', qs.stringify(newUseName), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`
                }
            });
        
            
            console.log("Response data:", response.data);
        } catch (error) {
            if (error.response && error.response.status === 422) {

                console.log("A 422 error occurred, but it's being handled gracefully.");
            } else {
                
                console.error('An error occurred:', error);
            }
        }
    }

      const generateRandomName = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const getRandomAlpha = () => alphabet[Math.floor(Math.random() * alphabet.length)];
    
        const currentDate = new Date();
        const currentSecond = currentDate.getSeconds();
    
        const randomAlphaPart = Array.from({ length: 3 }, getRandomAlpha).join('');
        return `${randomAlphaPart}user${currentSecond}`;
    }

    const generateRandomPassword = () => {
      const alphanumeric = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const getRandomAlphanumeric = () => alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
  
      const currentDate = new Date();
      const currentMinute = currentDate.getMinutes();
      const currentSecond = currentDate.getSeconds();
  
      const randomAlphanumericPart = Array.from({ length: 5 }, getRandomAlphanumeric).join('');
      return `${randomAlphanumericPart}dummy${currentMinute}${currentSecond}@`;
  }

  const changeUserName = () => {
    console.log("Username changed",generateRandomName());
    setIsUser(false);
  };

  const changePassword = () => {
    console.log("Password changed",generateRandomPassword());
    setIsUser(false);
    setIsPass(false);
  };


      const handleConfirmDelete = () => {
        setIsDisableModalOpen(false);
        setIsDelete(false);
        setIsBanAsAminOpen(false);
      };

    return (
        <Box>
            <StyledIconButton
                size={size}
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
            <Modal
                open={isPriview}
                onClose={handlePreview}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 800,
                        maxHeight: 700,
                        overflowY: "auto",
                        width: "90%",
                        outline: "none",
                        borderRadius: '10px',
                        border: '2px solid',
                    }}
                >
                    <PreviewModal typeS={typeS} item={item}/>
                </Box>
            </Modal>

            <Modal
                open={isDownloadModalOpen}
                onClose={handleDownloadModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 800,
                        maxHeight: 700,
                        overflowY: "auto",
                        width: "90%",
                        outline: "none",
                    }}
                >
                    <ModalDownloadPlaylist
                        open = {isDownloadModalOpen}
                        handleClose={handleDownloadModalClose}
                        id={id}
                        username={username}
                        password={password}
                        dns={dns}
                    />
                </Box>
            </Modal>
            <Modal
                open={isExtend}
                onClose={handleModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 800,
                        maxHeight: 700,
                        overflowY: "auto",
                        width: "90%",
                        outline: "none",
                        borderRadius: '10px',
                        border: '2px solid',
                    }}
                >
                <ModalExpend item={item} packagesGet={packagesGet} setIsExtend={setIsExtend}/>
                </Box>
            </Modal>
            <Modal
                open={isRefunds}
                onClose={handleModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 800,
                        maxHeight: 700,
                        overflowY: "auto",
                        width: "90%",
                        outline: "none",
                        borderRadius: '10px',
                        border: '2px solid',
                        padding: '10px 20px'
                    }}
                >
                <RefunModal item={item} setIsRefunds={setIsRefunds}/>
                </Box>
            </Modal>
            <Dialog
        open={isDisableModalOpen}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to disabled this ?
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
    <Dialog
        open={isBanAsAminOpen}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to band this item?
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
    <Dialog
        open={isDelete}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to  delete  this item?
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
      <Dialog
        open={isUser}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to  Genarate a new userName?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error" autoFocus>
            Cancel
          </Button>
          <Button onClick={changeUserName} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    <Dialog
        open={isPass}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to  Genarate a new `password`?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={changePassword} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
    );
};

export default MoreButtonManageLine;
