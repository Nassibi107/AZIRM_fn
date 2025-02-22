import { useEffect, useState } from "react";
import { Avatar, Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material"; // CUSTOM DEFINED HOOK

import useNavigate from "@/hooks/useNavigate"; // CUSTOM COMPONENTS
import  MoreButtonListUser  from "@/components/more-button/MoreButtonListUser";
import { FlexBox } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { TableMoreMenuItem, TableMoreMenu } from "@/components/table";
import axios from "axios";
 // ==============================================================
 const VITE_LEADER= import.meta.env.VITE_LEADER_URL;
// ==============================================================
const UserTableRow = props => {
  const {
    user,
    isSelected,
    handleSelectRow,
    handleDeleteUser
  } = props;
  const [cmp, setCmp] = useState();
  const navigate = useNavigate();
  const [openMenuEl, setOpenMenuEl] = useState(null);

  const handleOpenMenu = event => {
    setOpenMenuEl(event.currentTarget);
  };




  const handleCloseOpenMenu = () => setOpenMenuEl(null);

  return <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox size="small" color="primary" checked={isSelected} onClick={event => handleSelectRow(event, user.id)} />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
        
          <Box>
            <Paragraph fontWeight={500} color="text.primary" sx={{
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer"
            }
          }}>
            {user.firstName}
            </Paragraph>
          </Box>
        </FlexBox>
      </TableCell>
      
      {/* <TableCell padding="normal">{user.lastName}</TableCell> */}
      <TableCell padding="normal">{user.phoneNumber}</TableCell>
      <TableCell padding="normal">{user.status}</TableCell>
      <TableCell padding="normal">{"cmp"}</TableCell>
      <TableCell padding="normal">{user.email}</TableCell>
      <TableCell padding="normal">{user.address}</TableCell>
      <TableCell padding="normal">{user.role}</TableCell>

      <TableCell padding="normal">
          <MoreButtonListUser user={user} />
      </TableCell>
    </TableRow>;
};

export default UserTableRow;