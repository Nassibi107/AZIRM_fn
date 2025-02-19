import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import { Menu, MenuItem, Modal, Box } from '@mui/material';
import { useState } from 'react';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import PreviewVoucherTemplateModal from './PreviewVoucherTemplateModal'
import EditVoucherTemplateModal from './EditVoucherTemplateModal'

const VoucherTemplateAction = ({ dataRow, reloader }) => {

    const [anchorElA, setAnchorElA] = useState(null);
    const openS = Boolean(anchorElA);

    const [isPriview, setIsPriview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleClick = (event, rowData) => {
        setAnchorElA(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorElA(null);
      };

      const handlePreview = () => {
        setIsPriview(false);
        setIsEdit(false);
    };

    return(
    <>
        <Tooltip title={`action`} arrow placement="top" slots={{transition: Zoom,}}>
            <MoreVertRoundedIcon   onClick={(event) => handleClick(event, dataRow)}  sx={{ cursor: 'pointer' }} />
        </Tooltip>
        <Menu
            anchorEl={anchorElA}
            open={openS}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
          <MenuItem onClick={() => { console.log('Preview clicked'); handleClose(); setIsPriview(true); console.log(dataRow);
            
          }}>Preview</MenuItem>
          <MenuItem onClick={() => { console.log('Edit clicked'); handleClose(); setIsEdit(true); }}>Edit</MenuItem>
        </Menu>

        <PreviewVoucherTemplateModal isPriview={isPriview} handlePreview={handlePreview} dataRow={dataRow} />
        <EditVoucherTemplateModal isEdit={isEdit} handlePreview={handlePreview} dataRow={dataRow} reloader={reloader}/>
    </>
  )
};

export default VoucherTemplateAction;
