import EventBusyIcon from '@mui/icons-material/EventBusy';

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const EndDate = ({ EDate }) => {
    
  return(
    <>
        <Tooltip title={`${EDate}`} arrow placement="top" slots={{transition: Zoom,}}>
            <EventBusyIcon color='error'/>
        </Tooltip>
    </>
  )
};

export default EndDate;
