import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  Card,
  TableSortLabel,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  styled,
  Button,
  IconButton,
  Tooltip,
  Tabs ,
  useMediaQuery ,
  useTheme,
  Tab,
  Typography,
  Modal
} from '@mui/material';
import { H6 } from "@/components/typography";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import { BodyTableCell, HeadTableCell } from '../_common';
import { StatusBadge } from "@/components/status-badge";
import { MoreButtonManageLine } from "@/components/more-button";
import Link from '@/icons/Link';
import { QuillEditor } from "@/components/quill-editor";
import { useState } from 'react';
import { isDark } from "@/utils/constants";
import { FlexBetween } from "@/components/flexbox";
import Add from "@/icons/Add";
import { useNavigate } from 'react-router-dom';
import { ModalDns } from '../../../components/modal';
import CardPaid from '@/icons/Card';
import NoVideo from '@/icons/NoVideo';
import Web from '@/icons/Web';
import CopyLink from '@/icons/CopyLink';
import CopyText from '@/icons/CopyText';
import Success from '@/icons/Success';

// Utility functions for sorting
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const jsonData = [
  {
    "id": "TMuW8gjONi51GHvv",
  "name": "Hamady Diarra",
  "totalPayments": 4150.75,
  "payments": [
    50, 50, 37.5, 10, 30, 20, 125, 62.5, 250, 50, 62.5, 62.5, 135, 312.5, 115, 150, 135, 55, 50, 12.5, 135,
    110, 55, 150, 25, 118, 10, 15, 15, 25, 15, 62.5, 37.5, 12, 5, 50, 30, 10, 62.5, 50, 45, 25, 30, 62.5, 62.5,
    25, 75, 62.5, 31.25, 30, 62.5, 50, 62.5, 50, 12.5, 31.25, 75, 50, 30, 37.5, 25, 50, 25, 6.75, 62.5, 125, 125, 54
  ],
  "urls": [
    "https://squareup.com/receipt/preview/ThEs84W6CRPaonZgJZfrDgOWfc8YY",
    "https://squareup.com/receipt/preview/n5BJN06h2dxS60v5fjVpPQZ3N3WZY",
    "https://squareup.com/receipt/preview/lER4MVhctydX6MpcivtNgFmdTQBZY"
  ],
  "dates": [
    "2025-02-28T21:41:20.024Z",
    "2025-02-28T00:54:33.709Z",
    "2025-02-27T23:14:55.894Z"
  ]
  }
  // {user .....}
];

const columns = [
  { field: 'lineId', headerName: 'Line ID', width: 90 },
  { field: 'payment', headerName: 'Payment Amount', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'url', headerName: 'Receipt Link', width: 300, renderCell: (params) => <a href={params.value} target="_blank" rel="noopener noreferrer">View Receipt</a> }
];

const rows = jsonData.payments.map((payment, index) => ({
  id: index + 1,
  lineId: index + 1,
  payment: payment,
  date: jsonData.dates[index],
  url: jsonData.urls[index] || "#"
}));


const ListWrapper = styled(FlexBetween)(({ theme }) => ({
  gap: 16,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    ".MuiButton-root": {
      width: "100%"
    }
  }
}));


const FilterDays = () => {
  const navigate = useNavigate();
  const [filterDays, setFilterDays] = useState("Today");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangeFilter = (event, newValue) => {
    setFilterDays(newValue);
  };

  return (
    <Box pt={2} pb={4}>
      <ListWrapper>
        <Tabs
          value={filterDays}
          onChange={handleChangeFilter}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          variant={isSmallScreen ? "scrollable" : "standard"}
          scrollButtons={isSmallScreen ? "auto" : false}
        >
          <Tab disableRipple label="Today" value="Today" />
          <Tab disableRipple label="Yesterday" value="Yesterday" />
          <Tab disableRipple label="This Week" value="This Week" />
          <Tab disableRipple label="Last Week" value="Last Week" />
          <Tab disableRipple label="Last Month" value="Last Month" />
          <Tab disableRipple label="This Year" value="This Year" />
          <Tab disableRipple label="Last Year" value="Last Year" />
        </Tabs>

        <Button variant="outlined" startIcon={<Add />} onClick={() => navigate("/Report/vod/create")}>
          Add Report
        </Button>
      </ListWrapper>
    </Box>
  );
};
const Report = () => {
  const [openModal, setOpenModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Handle modal open and close
  const handleOpenModal = (payment, date, url) => {
    setPaymentDetails({ payment, date, url });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPaymentDetails(null);
  };

  return (
    <Card sx={{ mt: 3 }}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>{jsonData.name}</Typography> {/* Display user's name */}
        <Typography variant="body2" gutterBottom>Total Payments: ${jsonData.totalPayments}</Typography> {/* Display total payments */}

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={(e) => handleOpenModal(e.row.payment, e.row.date, e.row.url)}  
          />
        </Box>
      </Box>

      {/* Modal for payment details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, boxShadow: 24 }}>
          {paymentDetails && (
            <>
              <Typography variant="h6" gutterBottom>Payment Details</Typography>
              <Typography variant="body1"><strong>Payment Amount:</strong> ${paymentDetails.payment}</Typography>
              <Typography variant="body1"><strong>Date:</strong> {paymentDetails.date}</Typography>
              <Typography variant="body1"><strong>Receipt Link:</strong> <a href={paymentDetails.url} target="_blank" rel="noopener noreferrer">View Receipt</a></Typography>
              <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleCloseModal}>Close</Button>
            </>
          )}
        </Box>
      </Modal>
    </Card>
  );
};

export default Report;




