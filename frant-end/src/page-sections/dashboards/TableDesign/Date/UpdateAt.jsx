import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import UpdateDisabledRoundedIcon from '@mui/icons-material/UpdateDisabledRounded';
import TodayIcon from '@mui/icons-material/Today';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const UpdateAtDate = ({ UDate }) => {
    
  return(
    <>
        {/* <UpdateDisabledRoundedIcon color='error'  /> */}
        <Tooltip title={`${UDate}`} arrow placement="top" slots={{transition: Zoom,}}>
            <EditCalendarIcon color='warning'/>
        </Tooltip>
    </>
  )
};

export default UpdateAtDate;
