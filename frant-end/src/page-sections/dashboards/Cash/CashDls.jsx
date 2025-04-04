import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, Box, Typography, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

const GOOGLE_MAP_KEY = import.meta.env.VITE_YOUR_GOOGLE_MAPS_API_KEY;
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;

const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(`${ADMIN_ROUTE}/getAddress?lat=${lat}&lng=${lng}`);
      if (response.data.status === 'OK') {
        return response.data.results[0]?.formatted_address || 'No address found';
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address from backend:', error);
      return 'Error fetching address';
    }
  };
const CashDls = () => {
  const { id } = useParams();
  const location = useLocation(); // Get the location object
  const { user, dataReport } = location.state || {}; // Extract user and dataReport from state
  const theme = useTheme();
  
  const [addresses, setAddresses] = useState({}); // State to store the addresses
  const [loading, setLoading] = useState(true); // State for loading
  
  const formatEndDate = (date) => {
    if (!date) return null;
    let d = new Date(date);
    d.setUTCHours(23, 59, 59, 999);

    let day = String(d.getUTCDate()).padStart(2, '0');
    let month = String(d.getUTCMonth() + 1).padStart(2, '0');
    let year = d.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const currentUser = dataReport?.find((user) => user.id === id);

  // Fetch addresses for all donations when component mounts
  useEffect(() => {
    if (!currentUser) return;
    
    const fetchAddresses = async () => {
      const newAddresses = {};
      for (const payment of currentUser.donations) {
        if (payment.lat && payment.lng) {
          const address = await getAddressFromCoordinates(payment.lat, payment.lng);
          newAddresses[payment.id] = address;
        } else {
          newAddresses[payment.id] = 'Location not available';
        }
      }
      setAddresses(newAddresses); // Update state with fetched addresses
      setLoading(false); // Set loading to false once addresses are fetched
    };

    fetchAddresses();
  }, [currentUser]);

  const exportPaymentDetailsToExcel = async () => {
    // Mapping payments to ensure we fetch the addresses asynchronously
    const paymentDetails = await Promise.all(
      currentUser.donations.map(async (payment) => {
        const address = await getAddressFromCoordinates(payment.lat, payment.lng) || "N/A";
  
        return {
          id: payment.id,
          Date: formatEndDate(payment.createdAt) || "error",
          Amount: payment.amount,
          location: address, // Now it's resolved address
          lat: payment.lat || "N/A", 
          lng: payment.lng || "N/A",
        };
      })
    );
  
    // Create worksheet and book as before
    const ws = XLSX.utils.json_to_sheet(paymentDetails);
    const wb = XLSX.utils.book_new();
    const dateAt = currentUser.donationDate?.split('T')[0];
 
     // Format date as dd/mm/yyyy
    XLSX.utils.book_append_sheet(wb, ws, 'Payment Details');
  
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    saveAs(file, `${currentUser.firstName}_payment_details_${dateAt}.xlsx`);
  };

  if (!currentUser) {
    return <Typography>No user found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" color="primary" gutterBottom align="center" fontWeight="bold">
          Cash Report for {currentUser.name}
        </Typography>

        <Divider sx={{ mb: 3 }} />
        
        <Paper sx={{ padding: 2, mb: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
            Total Cash
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>
            ${currentUser.totalAmount}
          </Typography>
        </Paper>

        <Paper sx={{ padding: 2, mb: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
            Cash Breakdown
          </Typography>

          {/* Matrix Table for Payment Breakdown */}
          <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.paper }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>id</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>location</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.divider}` }}>map</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUser.donations.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell sx={{ color: theme.palette.text.primary }}>{payment.id}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {formatEndDate(payment.createdAt) || "error"}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {payment.amount} $
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      {loading ? 'Loading...' : addresses[payment.id] || 'N/A'}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      <a
                        href={`https://www.google.com/maps?q=${payment.lat},${payment.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Map
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

export default CashDls;
