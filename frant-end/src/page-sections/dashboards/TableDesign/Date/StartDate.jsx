import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import TodayIcon from '@mui/icons-material/Today';

const StartDate = ({ SDate }) => {
  return(
    <>
        <Tooltip title={`${SDate}`} arrow placement="top" slots={{transition: Zoom,}}>
            <CalendarTodayRoundedIcon color='success'/>
        </Tooltip>
    </>
  )
};

export default StartDate;
