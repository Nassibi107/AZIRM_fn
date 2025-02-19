import { useState } from "react";
import { Box, Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENT
import { useNavigate } from "react-router-dom";
import CopyText from "../../icons/CopyText";
import Edit from "../../icons/Edit";
import Globe from "../../icons/Globe";
import axios from "axios";
import { ContactSupportOutlined } from "@mui/icons-material";
const StyledIconButton = styled(IconButton)(({
  theme
}) => ({
  flexShrink: 0,
  color: theme.palette.grey[isDark(theme) ? 300 : 400]
}));

// ==============================================================
const optionList = ["Edit","Enable","Copy"]; // ==============================================================
const MoreButtonListTemplate = ({
  size = "large",
  options = optionList,
  renderOptions,id,idPack,
  Disable ,
  is_global ,
  show_for_my_created, 
  name,
  onActionComplete,
  ...props
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const API_URLS = import.meta.env.VITE_LV_URL;

  const ft_publish = async () => 
  {
    try {

      const data = {
        name: name ,
        package_id: idPack,
        is_global: is_global,
        show_for_my_created: show_for_my_created || 0,
        publish :  Disable == "Yes" ? 0 : 1,
      }

       const repEnp = await axios.put(`${API_URLS}/templates/${id}`,data,{
        headers: {
          'Content-Type': 'application/json'
        }
       });
 
       onActionComplete();
    }catch(error)
    {
          console.log(error.message || "can't enable this item !");
    }
  }
  const ft_cptmp = async () => 
  {
    try {
      const Retrive = await axios.get(`${API_URLS}/templates/${id}/bouquets`);
      const bq = Retrive.data.data.map(item => item.id);
      const data = {
        name: name + "_Copy",
        package_id: idPack,
        is_global: is_global,
        show_for_my_created: show_for_my_created || 0,
        publish :  Disable == "Yes" ? 1 : 0,
        bouquets : bq
      }
       const repEnp = await axios.post(`${API_URLS}/templates`,data,{
        headers: {
          'Content-Type': 'application/json'
        }
       });
       console.log(repEnp);
       onActionComplete();
    }catch(error)
    {
      console.log(error.message || "can't enable this item !");
    }
  }

  const handleClose = (option) => {
    if (option == "Edit")
      navigate(`/EditTempale/${id}`);
    else if (option == "Enable")
      ft_publish();
    else if (option == "Copy")
      ft_cptmp();
    setAnchorEl(null)
  };

  return <Box>
      <StyledIconButton size={size} aria-label="more" aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)} {...props}>
        <MoreVert fontSize="small" />
      </StyledIconButton>

      <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)} TransitionComponent={Fade}>
        {renderOptions ? renderOptions(handleClose) : options.map(option => <MenuItem key={option} onClick={()=>{handleClose (option)}}>
               <GetIcons option={option} Disable={Disable} />
              </MenuItem>)}
      </Menu>
    </Box>;
};

const GetIcons = ({option, Disable}) => 
{
  return (
    <>
      {option === 'Copy' ? (
        <>
          <CopyText />
          {option}
        </>
      ) : option === 'Edit' ? (
        <>
          <Edit />
          {option}
        </>
      ) :option === 'Enable' ? (<>
        <Globe />
        {Disable == "Non" ?option : "Disbale"} 
        </>
      ):""}
    </>
  ); 
  
}

export default MoreButtonListTemplate;