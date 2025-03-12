// In your ReportD component (Second page)
import { useLocation, useParams } from 'react-router-dom';
import { Card, Box, Typography, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,useTheme  } from '@mui/material';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ReportD = () => {
  const { id } = useParams(); 
  const location = useLocation(); // Get the location object
  const { user, dataReport } = location.state || {}; // Extract user and dataReport from state
  const theme = useTheme(); // G
  console.log(id); // Get the user ID from the URL
  console.log(dataReport); // This will be the entire report data passed from the first page
  
  // Find the user by ID from the passed dataReport
  const currentUser = dataReport?.find((user) => user.id === id);

  const exportPaymentDetailsToExcel = () => {
    const paymentDetails = currentUser.payments.map((payment, index) => ({
      PaymentAmount: payment,
      Date: currentUser.dates[index],
      ReceiptLink: currentUser.urls[index] || 'No Link',
    }));

    const ws = XLSX.utils.json_to_sheet(paymentDetails);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payment Details');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(file, `${currentUser.name}_payment_details.xlsx`);
  };

  if (!currentUser) {
    return <Typography>No user found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" color="primary" gutterBottom align="center" fontWeight="bold">
          Payment Report for {currentUser.name}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Paper sx={{ padding: 2, mb: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
            Total Payments
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>
            ${currentUser.totalPayments}
          </Typography>
        </Paper>

        <Paper sx={{ padding: 2, mb: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
            Payments Breakdown
          </Typography>

          {/* Matrix Table for Payment Breakdown */}
          <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.paper }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>Payment Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>Receipt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUser.payments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{payment} $</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{currentUser.dates[index]}</TableCell>
                    <TableCell>
                      <a href={currentUser.urls[index]} target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                        View Receipt
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" color="primary" onClick={exportPaymentDetailsToExcel}>
            Export Payment Details Excel
          </Button>
          <Button variant="contained" color="secondary" onClick={() => window.history.back()}>
            Back
          </Button>
        </Box>
      </Card>
    </Box>
  );
};


export default ReportD;
