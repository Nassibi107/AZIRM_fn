import {
  Box,
  Card,
  TableSortLabel,
  Table,
  TablePagination,
  Divider,
  Grid,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Checkbox,
  Button,
} from '@mui/material';
import { H6 } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { BodyTableCell, HeadTableCell } from '../_common';
import { StatusBadge } from "@/components/status-badge";
import { useCallback, useEffect, useState } from 'react';
import { isDark } from "@/utils/constants";
import { FlexBetween } from "@/components/flexbox";
import Add from "@/icons/Add";
import { Search } from '@mui/icons-material';
import ModalCreateTransaction from '../../../components/modal/ModalCreateTransaction';
import axios from 'axios';
import { LoadingProgress } from '../../../components/loader';
import MoreButtonTransition from '../../../components/more-button/MoreButtonTransition';
import Cookies from 'js-cookie';

// Fonction utilitaire pour comparer deux valeurs lors du tri
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Fonction utilitaire pour trier un tableau de données en fonction de la comparaison
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Fonction utilitaire pour comparer deux valeurs lors du tri descendant
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const ListTransaction = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [type, setType] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleChangeFrom = (e) => {
    setFrom(e.target.value);
  };

  const handleChangeTo = (e) => {
    setTo(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }; 

  const fetshData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(import.meta.env.VITE_LV_URL + '/transactions' , {} , {
        headers : {
          "Authorization" : `Bearer ${Cookies.get("accessToken")}`
        }
      } , {
        params: {
          page: page + 1,
          per_page: rowsPerPage,
        }
      })

      if ( response.data ) {
        setData(response.data.data)
        setTotalRows(response.data.total)
      }
    } catch ( error ) {
      console.error('error fetsh transactions : ' , error)
    } finally {
      setLoading(false)
    }
  }, [page , rowsPerPage]);

  useEffect(()=>{
    fetshData()
  } , [fetshData])

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      const selectedItemsIds = data.map(item => item.id);
      setSelectedItems(selectedItemsIds);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSingleSelect = (event, itemId) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const isSelected = (itemId) => selectedItems.indexOf(itemId) !== -1;

  const filteredData = data.filter(item =>
    item.amount?.toString().includes(search.toLowerCase()) ||
    item.description?.toString().includes(search.toLowerCase()) ||
    item.type?.toString().includes(search.toLowerCase())
  );

  ////// CREATE TRANSLATION MODAL
  const [createTransactionOpen , setOpenTransactionOpen] = useState(false)
  const handleOpenCreationTransaction = () => {
    setOpenTransactionOpen(true)
  }
  const handleCloseCreationTransaction = () => {
    setOpenTransactionOpen(false)
  }

  return (
    <Card sx={{ mt: 3 }}>
      {loading && (<LoadingProgress/>)}
      <ModalCreateTransaction open={createTransactionOpen} handleClose={handleCloseCreationTransaction}/>
      <FlexBetween>
        <H6 fontSize={14} px={3} py={2}>List Transaction</H6>
        <Button color="secondary" sx={{ mx: 2 }} onClick={handleOpenCreationTransaction}><Add /></Button>
      </FlexBetween>
      <Divider />
      <Box margin={3}>
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <TextField fullWidth select label="From" value={from} onChange={handleChangeFrom}>
              <MenuItem value="1">All</MenuItem>
              <MenuItem value="2">SlaxMed</MenuItem>
              <MenuItem value="2">Oliver Martin</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField fullWidth select label="To" value={to} onChange={handleChangeTo}>
              <MenuItem value="1">All</MenuItem>
              <MenuItem value="2">SlaxMed</MenuItem>
              <MenuItem value="2">Oliver Martin</MenuItem>
            </TextField>
          </Grid>
          <Grid item sm={4} xs={12}>
            <TextField fullWidth select label="Type" value={type} onChange={handleChangeType}>
              <MenuItem value="1">All</MenuItem>
              <MenuItem value="2">Start Credit</MenuItem>
              <MenuItem value="3">Normal</MenuItem>
              <MenuItem value="4">Refund</MenuItem>
              <MenuItem value="5">Subscription Payment</MenuItem>
              <MenuItem value="6">Paid Trail Payment</MenuItem>
              <MenuItem value="7">Transfer Refunded</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <TextField sx={{my : 1}} fullWidth placeholder="Search..." InputProps={{ startAdornment: <Search />}} value={search} onChange={handleChangeSearch} />
        <TableContainer sx={{ mt: 2 }}>
          <Scrollbar autoHide={false}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead sx={{ backgroundColor: theme => isDark(theme) ? "grey.700" : "grey.100" }}>
                <TableRow>
                  <HeadTableCell align="center" padding="normal">
                    <Checkbox
                      indeterminate={selectedItems.length > 0 && selectedItems.length < data.length}
                      checked={selectAll}
                      onChange={handleSelectAll}
                      color="primary"
                      inputProps={{ 'aria-label': 'select all items', }}
                    />
                  </HeadTableCell>
                  <HeadTableCell align="center" sx={{ color: "text.primary", fontWeight: 600 }} padding="normal">
                    <TableSortLabel
                      active={orderBy === 'from_user_id'}
                      direction={orderBy === 'from_user_id' ? order : 'asc'}
                      onClick={() => handleRequestSort('from_user_id')}
                    >
                      from
                    </TableSortLabel>
                  </HeadTableCell>
                  <HeadTableCell align="center" sx={{ color: "text.primary", fontWeight: 600 }} padding="normal">
                    <TableSortLabel
                      active={orderBy === 'to_user_id'}
                      direction={orderBy === 'to_user_id' ? order : 'asc'}
                      onClick={() => handleRequestSort('to_user_id')}
                    >
                      to
                    </TableSortLabel>
                  </HeadTableCell>
                  <HeadTableCell align="center" sx={{ color: "text.primary", fontWeight: 600 }} padding="normal">
                    <TableSortLabel
                      active={orderBy === 'amount'}
                      direction={orderBy === 'amount' ? order : 'asc'}
                      onClick={() => handleRequestSort('amount')}
                    >
                      amount
                    </TableSortLabel>
                  </HeadTableCell>
                  <HeadTableCell align="center" sx={{ color: "text.primary", fontWeight: 600 }} padding="normal">
                    <TableSortLabel
                      active={orderBy === 'type'}
                      direction={orderBy === 'type' ? order : 'asc'}
                      onClick={() => handleRequestSort('type')}
                    >
                      type
                    </TableSortLabel>
                  </HeadTableCell>
                  <HeadTableCell align="center" sx={{ color: "text.primary", fontWeight: 600 }} padding="normal">
                    <TableSortLabel
                      active={orderBy === 'description'}
                      direction={orderBy === 'description' ? order : 'asc'}
                      onClick={() => handleRequestSort('description')}
                    >
                      description
                    </TableSortLabel>
                  </HeadTableCell>
                  <HeadTableCell align="center" sx={{ color: "text.primary", fontWeight: 600 }} padding="normal">
                    <TableSortLabel
                      active={orderBy === 'created_at'}
                      direction={orderBy === 'created_at' ? order : 'asc'}
                      onClick={() => handleRequestSort('created_at')}
                    >
                      createAt
                    </TableSortLabel>
                  </HeadTableCell>
                  <HeadTableCell align="center" sx={{ color: "text.primary", fontWeight: 600 }} padding="normal">
                    ACTIONS
                  </HeadTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {stableSort(filteredData, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', cursor: 'pointer' } }}>
                    <BodyTableCell align="center">
                      <Checkbox
                        checked={isSelected(item.id)}
                        onChange={(event) => handleSingleSelect(event, item.id)}
                        color="primary"
                      />
                    </BodyTableCell>
                    <BodyTableCell align="center" style={{ fontWeight: 'bold' }}>{item.from_user_id}</BodyTableCell>
                    <BodyTableCell align="center" style={{ fontWeight: 'bold' }}>{item.to_user_id}</BodyTableCell>
                    <BodyTableCell align="center">
                      <StatusBadge type="success">{item.amount}</StatusBadge>
                    </BodyTableCell>
                    <BodyTableCell align="center">{item.type}</BodyTableCell>
                    <BodyTableCell align="center">{item.description}</BodyTableCell>
                    <BodyTableCell align="center">{item.created_at}</BodyTableCell>
                    <BodyTableCell align="center"><MoreButtonTransition/></BodyTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 5))}
        />
      </Box>
    </Card>
  );
};

export default ListTransaction;