import { useEffect, useState } from "react";
import { Box, Menu, Stack, Button, Avatar, useTheme, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material"; // Import Edit here

import { Modal } from "@/components/modal";
import AddContactForm from "./AddContactForm";
import { TableMoreMenuItem } from "@/components/table";
import { H6, Paragraph } from "@/components/typography";
import FlexBetween from "@/components/flexbox/FlexBetween"; // CUSTOM ICON COMPONENTS



import Add from "@/icons/Add";
import Call from "@/icons/Call";
import City from "@/icons/City";
import Edit from "@/icons/Edit";
import Flag from "@/icons/Flag";
import User from "@/icons/User";
import Email from "@/icons/Email";
import Skype from "@/icons/Skype";
import ShareVs from "@/icons/ShareVs";
import Birthday from "@/icons/Birthday";
import Facebook from "@/icons/Facebook";
import Whatsapp from "@/icons/Whatsapp";
import Messenger from "@/icons/Messenger";
import { isDark } from "@/utils/constants"; // ==============================================================
import axios from "axios";
import MoreHorizontal from "@/icons/MoreHorizontal"; 

const   ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const UserDetails = ({
  data
}) => {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog
  const [cmp, setCmp] = useState();
  const handleCloseModal = () => setOpenModal(false);
  const handleDeleteUser = async (id)=> {
    try {
   
      const res = await axios.delete(`${ADMIN_ROUTE}/user/${id}`);
      console.log(res);

    } catch (error) {
      console.error(error);
  };
}
const _getCompany = async () => {
  try {
    console.log(data);
    console.log(data.Cmpid);
    const res = await axios.get(`${ADMIN_ROUTE}/cmp/${data.CmpRid}`);
    console.log(res.data.data.label);
    setCmp(res.data.data.label);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  _getCompany();  
}, [data]);
  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenDialog(true); // Open the confirmation dialog when the menu is closed
  };

  const handleConfirmDelete = (id) => {
    setOpenDialog(false);
    // Place your delete action here
    handleDeleteUser(id);
    
  };

  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the dialog without deleting
  };

  return (
    <Box sx={{
      padding: 3,
      height: "100%",
      borderTopRightRadius: "1rem",
      borderBottomRightRadius: "1rem",
      backgroundColor: isDark(theme) ? "grey.800" : "grey.100"
    }}>
      <Modal open={openModal} handleClose={handleCloseModal}>
        <AddContactForm handleCancel={handleCloseModal} data={isEdit ? data : null} />
      </Modal>

      {data ? <>
        <FlexBetween mt={4}>
          <IconButton onClick={() => {
            setIsEdit(true);
            setOpenModal(true);
          }}>
            <Edit fontSize="small" sx={{
              color: "text.secondary"
            }} />
          </IconButton>

          <IconButton sx={{
            backgroundColor: isDark(theme) ? "grey.700" : "white"
          }} onClick={e => setAnchorEl(e.currentTarget)}>
            <MoreHorizontal fontSize="small" sx={{
              color: "text.secondary"
            }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} transformOrigin={{
            vertical: "center",
            horizontal: "right"
          }}>
            <TableMoreMenuItem Icon={DeleteOutline} title="Delete" handleClick={handleCloseMenu} />
          </Menu>
        </FlexBetween>

        <Stack alignItems="center">
          <H6 fontSize={16} mt={2}>
            {data.firstName} {data.lastName}
          </H6>

          <Paragraph color="text.secondary" mt={0.5}>
            {data.role}
          </Paragraph>
        </Stack>

        <Box mt={4}>
          <ListItem Icon={City} title={cmp || "ADMIN"} />
          <ListItem Icon={Email} title={data.email} />
          <ListItem Icon={Call} title={data.phoneNumber} />
          <ListItem Icon={Flag} title={data.address} />
        </Box>

      </> : <Box height="100%" display="flex" alignItems="center" justifyContent="center" color="text.secondary">
        No Data
      </Box>}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Paragraph>Are you sure you want to delete this user?</Paragraph>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmDelete(data.id)} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetails;

function ListItem({
  Icon,
  title
}) {
  return <Stack direction="row" spacing={1.5} pb={2} alignItems="center">
    <Icon sx={{
      color: "text.secondary",
      fontSize: 20
    }} />
    <Paragraph color="grey.500">{title}</Paragraph>
  </Stack>;
}
