import { useState } from "react";
import { Box, Fade, IconButton, Menu, MenuItem, styled } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert"; 
import { isDark } from "@/utils/constants"; 
import { Edit, Delete } from '@mui/icons-material';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.grey[isDark(theme) ? 300 : 400]
}));

const optionList = ["Edit", "Logs"]; 

const MoreButtonListVarTem = ({
  size = "large",
  options = optionList,
  renderOptions,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <StyledIconButton size={size} aria-label="more" aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)} {...props}>
        <MoreVert fontSize="small" />
      </StyledIconButton>

      <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)} TransitionComponent={Fade}>
        <MenuItem>
          <IconButton sx={{ color: 'yellow' }} onClick={() => console.log('Edit')}>
            <Edit />
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton onClick={() => console.log('Delete')}>
            <Delete />
          </IconButton>
        </MenuItem> 
      </Menu>
    </Box>
  );
};

export default MoreButtonListVarTem;
