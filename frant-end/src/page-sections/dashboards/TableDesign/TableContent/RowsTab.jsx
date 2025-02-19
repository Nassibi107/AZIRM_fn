import TableCell from '@mui/material/TableCell';
import StatusRenderer from '../Buzzers/StatusRenderer';
import CreateAtDate from '../Date/CreateAt';
import UpdateAtDate from '../Date/UpdateAt';
import EndDate from '../Date/EndDate';
import StartDate from '../Date/StartDate';




const RowTab = ({ isRowSelected, item, column }) => {
  return (
    <TableCell
      align="center"
      sx={{
        padding: '16px',
        fontWeight: isRowSelected ? 'bold' : 'normal',
      }}
    >
      {column.split('.')[0] === 'status' ? (
        <StatusRenderer status={item} />
      )
      : (column.split('.')[0] === 'start_Date') ? (
        <StartDate SDate={item} />
      ) 
      : (column.split('.')[0] === 'created_At') ? (
        <CreateAtDate CDate={item} />
      ) 
      : (column.split('.')[0] === 'updated_At')? (
        <UpdateAtDate UDate={item} />
      ) 
      : (column.split('.')[0] === 'end_Date') ? (
        <EndDate EDate={item} />
      ) 
      :( item )}
    </TableCell>
  );
};

export default RowTab;

// 

