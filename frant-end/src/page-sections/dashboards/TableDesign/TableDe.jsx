import React, { useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import RowTab from "./TableContent/RowsTab";
import { isDark } from "@/utils/constants";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import './TableDe.css';
import RewardProgramAction from './Action/RewardProgramAction/RewardProgramAction';
import PaidTrialPriceAction from './Action/PaidTrailPrice/PaidTrialPriceAction';
import VoucherAction from './Action/Voucher/VoucherAction';
import VoucherTemplateAction from './Action/VoucherTemplate/VoucherTemplateAction';
import ActiveCodeDeviceAction from './Action/ActiveCodeDevice/ActiveCodeDeviceAction'

import {
  ListItemText,
  Paper,
  Box,
  Menu,
  Table,
  Grid,
  TableBody,
  TableContainer,
  TableHead,
  Select,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Checkbox,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
} from '@mui/material';

const extractBaseColumnName = (column) => {
  return column.split('.')[0];
};

const TableDe = ({ columns, data, reloader }) => {

  const action = columns[0];
  const columnNames = columns.slice(1);

  const initialColumnVisibility = Object.fromEntries(columnNames.map(col => {
    const baseColumn = extractBaseColumnName(col);
    const isVisible = col.endsWith('.1');
    return [baseColumn, isVisible];
  }));


  const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility);
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('Select');
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleColumn = (column) => {
    setColumnVisibility((prev) => ({ ...prev, [extractBaseColumnName(column)]: !prev[extractBaseColumnName(column)] }));
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(data.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const formatColumnName = (column) => {
    let formattedName = extractBaseColumnName(column)
      .replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return formattedName;
  };

  const formatColumnNameHead = (column) => {
    let formattedName = extractBaseColumnName(column).replace(/_/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (formattedName.length >= 15) {
      return formattedName.length > 10 ? formattedName.slice(0, 13) + '...' : formattedName;
    }

    return formattedName;
  };

  const isAllSelected = selectedRows.length === data.length;

  const filteredRows = data.filter((row) => {
    if (!selectedColumn || selectedColumn === 'Select' || !searchTerm) return true;
    const columnValue = row[extractBaseColumnName(selectedColumn)]?.toString().toLowerCase();
    return columnValue && columnValue.includes(searchTerm.toLowerCase());
  });

  const getBackgroundColor = (theme, index, isRowSelected) => {
    const isDarkTheme = isDark(theme);
    if (isDarkTheme) {
      if (isRowSelected)
        return 'rgba(0, 0, 0, 0.6)';
      return index % 2 === 0 ? 'rgba(96, 139, 193, 0.2)' : 'rgba(96, 139, 193,)';
    } else {
      if (isRowSelected)
        return 'rgba(0, 0, 0, 0.095)';
      return index % 2 === 0 ? 'rgb(245,244,244)' : 'rgb(254,254,255)';
    }
  };

  return (
    <div>
      <Grid mt={5} container alignItems="center" justifyContent="space-between" spacing={2}>
        <Grid item>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <Select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                displayEmpty
                sx={{
                  minWidth: '150px',
                  height: '55px',
                  '& .MuiSelect-select': { paddingLeft: 2 },
                }}
              >
                <MenuItem value="Select">Select Column</MenuItem>
                {columnNames.map((column) => (
                  <MenuItem key={column} value={column}>{formatColumnName(column)}</MenuItem>
                ))}
              </Select>
            </Grid>

            {selectedColumn !== "Select" && (
              <Grid item>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={`Search in ${formatColumnName(selectedColumn)}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ minWidth: '200px', height: '55px', padding: '5px' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              height: '55px',
              '&:hover': { backgroundColor: 'primary.light' },
            }}
          >
            Manage Columns
          </Button>
        </Grid>

      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {columnNames.map((column) => (
          <MenuItem key={column}>
            <Checkbox
              checked={columnVisibility[extractBaseColumnName(column)]}
              onChange={() => handleToggleColumn(column)}
              color="primary"
            />
            <ListItemText primary={formatColumnName(column)} />
          </MenuItem>
        ))}
      </Menu>

      <TableContainer component={Paper} className="custom-scrollbar" style={{ marginTop: '20px',  borderRadius: '10px' }}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: theme => isDark(theme) ? "grey.600" : "rgba(105,80,232, 0.25)" }}>
            <TableRow>
              <TableCell align="center" sx={{ padding: '16px' }}>
                <Checkbox
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  color="primary"
                />
              </TableCell>
              {columnNames.map((column) =>
                columnVisibility[extractBaseColumnName(column)] && (
                  <Tooltip key={column} title={`${formatColumnName(column)} column`} arrow placement="top" slots={{ transition: Zoom }}>
                    <TableCell
                      key={column}
                      align="center"
                      sx={{
                        padding: '16px',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      {formatColumnNameHead(column)}
                    </TableCell>
                  </Tooltip>
                )
              )}
              <TableCell align="center" sx={{ padding: '16px' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRows.map((row, index) => {
              const isRowSelected = selectedRows.includes(index);

              return (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme => isDark(theme) ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      '& > *': {
                        color: theme => isDark(theme) ? 'white' : 'black',
                      },
                    },
                    backgroundColor: theme => getBackgroundColor(theme, index, isRowSelected),
                    borderBottom: '1px solid',
                    borderColor: theme => isDark(theme) ? 'grey.700' : 'grey.300',
                    position: 'relative',
                  }}
                >
                  <TableCell align="center" sx={{ padding: '16px' }}>
                    <Checkbox
                      checked={isRowSelected}
                      onChange={() => handleSelectRow(index)}
                      color="primary"
                    />
                  </TableCell>
                  {columnNames.map((column) =>
                    columnVisibility[extractBaseColumnName(column)] && (
                      <RowTab
                        key={column}
                        isRowSelected={isRowSelected}
                        item={row[extractBaseColumnName(column)]}
                        column={column}
                      />
                    )
                  )}
                  <TableCell align="center" sx={{ padding: '16px' }}>
                    {action === "reward" ? (
                      <RewardProgramAction dataRow={row} reloader={reloader} />
                    ) : action === "paidTrialPrices" ? (
                      <PaidTrialPriceAction dataRow={row} reloader={reloader} />
                    ) : action === "voucher" ? (
                      <VoucherAction dataRow={row} reloader={reloader} />
                    ) : action === "voucherTemplate" ? (
                      <VoucherTemplateAction dataRow={row} reloader={reloader} />
                    ) : action === "ActiveCodeDevice" ? (
                      <ActiveCodeDeviceAction dataRow={row} reloader={reloader} />
                    )
                    : (
                      <Button variant="contained" color="primary" onClick={() => console.log('Row information:', row)}>Log Info</Button>
                    )}
                  </TableCell>
                  {
                    isRowSelected &&
                    (
                      <>
                        <TableCell className="hover-overlay" colSpan={columnNames.length + 1} sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.1)', zIndex: 1 }}>
                        </TableCell>
                      </>
                    )
                  }
                </TableRow>
              );
            })}
          </TableBody>

          {
            data.length === 0 && (
              <TableBody sx={{ my: '20px', height: '400px' }}>
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: '20px',
                      }}
                    >
                      <Typography variant="h6" color="text.secondary" sx={{ mb: '10px' }}>
                        Loading ...
                      </Typography>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )
          }

        </Table>
      </TableContainer>
    </div>
  );
};

export default TableDe;
