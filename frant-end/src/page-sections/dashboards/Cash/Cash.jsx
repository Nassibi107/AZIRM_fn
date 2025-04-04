import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Card, Divider, Grid, TextField, Button,
  CircularProgress
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { FlexBox } from '@/components/flexbox';
import { IconWrapper } from '@/components/icon-wrapper';
import Pages from '@/icons/Pages';
import { H6 } from '@/components/typography';
import { set } from 'nprogress';

// API Route
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;

const Cash = () => {
  const navigate = useNavigate();
  const today = new Date();
  const startOfToday = new Date(today.setUTCHours(0, 0, 0, 0));  // RFC 3339 format
  const endOfToday = new Date(today.setUTCHours(23, 59, 59, 999)); // 
  const [sdata, setSdata] = useState(startOfToday);
  const [edata, setEdata] = useState(endOfToday);
  const [dataReport, setDataReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRowClick = (user) => {
    navigate(`/CashDlsPage/${user.id}`, { state: { user ,dataReport} });
  };

  // Format Start Date: Set time to 00:00:00.000Z
  const formatStartDate = (date) => {
    if (!date) return null;
    let d = new Date(date);
    
  // Extract the day, month, and year
    let day = String(d.getUTCDate()).padStart(2, '0');
    let month = String(d.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based
    let year = d.getUTCFullYear();

  return `${day}-${month}-${year}`;
  };

  // Format End Date: Set time to 23:59:59.999Z
  const formatEndDate = (date) => {
    if (!date) return null;
    let d = new Date(date);
    d.setUTCHours(23, 59, 59, 999);
    return d.toISOString().substring(0, 10);
  };

  useEffect(() => {
    if (!sdata || !edata) return; // Prevent fetching if dates are not selected

    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await axios.get(
          `${ADMIN_ROUTE}/reportDaily?date=${formatStartDate(sdata)}` 
        );
        setDataReport(response.data);
        console.log(response); // Use response.data instead of response.json()
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sdata, edata]);

// "id": "1",
//         "firstName": "admin",
//         "lastName": "unknown",
//         "donationDate": "2025-03-08T15:25:47.666Z",
//         "donationCount": 6,
//         "totalAmount": 184,/ 
  const columns = [
    { field: 'id', headerName: 'id', width: 180 },
    { field: 'firstName', headerName: 'prenom', width: 150 },
    { field: 'lastName', headerName: 'nom', width: 180 },
    { field: 'donationDate', headerName: 'date', width: 180 },
    { field: 'donationCount', headerName: 'count', width: 180 },
    { field: 'totalAmount', headerName: 'total', width: 180 },
  ];

  // Convert API Data to Table Rows
  const rows = dataReport.map((user, index) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    donationDate: user.donationDate.substring(0, 10),
    donationCount: user.donationCount,
    totalAmount: user.totalAmount.toFixed(2), 
  }));

  // Export Data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report Data');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(file, 'report_data.xlsx');
  };

  return (
    <Card sx={{ mt: 3, padding: 3 }}>
      <FlexBox gap={0.5} alignItems="center">
        <IconWrapper>
          <Pages sx={{ color: "primary.main" }} />
        </IconWrapper>
        <H6 fontSize={16}>cash Report</H6>
      </FlexBox>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item md={4} xs={12} sm={4}>
            <DatePicker
              label="Start Date"
              value={sdata}
              onChange={(date) => setSdata(date)}
              fullWidth
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        
          <Grid item md={2} xs={6} sm={4}>
            <Button variant="outlined" color="primary" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="20vh">
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={(e) => handleRowClick(e.row)} 
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Cash;
