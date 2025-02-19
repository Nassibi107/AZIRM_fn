import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import TodayIcon from '@mui/icons-material/Today';

const CreateAtDate = ({ CDate }) => {
  return(
    <>
        <Tooltip title={`${CDate}`} arrow placement="top" slots={{transition: Zoom,}}>
            <TodayIcon color='info'/>
        </Tooltip>
    </>
  )
};

export default CreateAtDate;
