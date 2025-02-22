import { useEffect, useState } from "react";
import { Box, Button, Card, Table, TableBody, TableContainer, TablePagination } from "@mui/material"; // CUSTOM COMPONENTS

import { Scrollbar } from "@/components/scrollbar";
import { TableDataNotFound, TableToolbar } from "@/components/table"; // CUSTOM PAGE SECTION COMPONENTS

import SearchArea from "../SearchArea";

import UserLeaderTableRow from "../UserLeaderTableRow";
import UserTableHead from "../UserTableHead"; // CUSTOM DEFINED HOOK
const VITE_LEADER= import.meta.env.VITE_LEADER_URL;
import useMuiTable, { getComparator, stableSort } from "@/hooks/useMuiTable"; // CUSTOM DUMMY DATA
import axios from "axios";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";



const UserLeaderPageView = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState({
    role: "",
    search: ""
  });
  const {
    page,
    order,
    orderBy,
    selected,
    isSelected,
    rowsPerPage,
    handleSelectRow,
    handleChangePage,
    handleRequestSort,
    handleSelectAllRows,
    handleChangeRowsPerPage
  } = useMuiTable({
    defaultOrderBy: "name"
  });

  const _getUser = async () => {

    try {
      const res = await axios.get(`${VITE_LEADER}/users`);

      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    _getUser(); 
  }, []);

  const handleChangeFilter = (key, value) => {
    setUserFilter(state => ({ ...state,
      [key]: value
    }));
  };


  let filteredUsers = stableSort(users, getComparator(order, orderBy)).filter(item => {
     console.log(item);
    if (userFilter.role) return item.role.toLowerCase() === userFilter.role;else if (userFilter.search) return item.firstName.toLowerCase().includes(userFilter.search.toLowerCase());else return true;
  });

  const handleDeleteUser = id => {
    setUsers(state => state.filter(item => item.id !== id));
  };

  const handleAllUserDelete = () => {
    setUsers(state => state.filter(item => !selected.includes(item.id)));
    handleSelectAllRows([])();
  };

  return <Box pt={2} pb={4}>
      <Card>
      
        <Box px={2} pt={2}>
          <SearchArea value={userFilter.search} gridRoute="/ouser-grid" listRoute="/ousers" onChange={e => handleChangeFilter("search", e.target.value)} />
        </Box>
        
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/user-add")}>
        Add New User
      </Button>
        {
        /* TABLE ROW SELECTION HEADER  */
      }
        {selected.length > 0 && <TableToolbar selected={selected.length} handleDeleteRows={handleAllUserDelete} />}

        {
        /* TABLE HEAD & BODY ROWS */
      }
        <TableContainer>
          <Scrollbar autoHide={false}>
            <Table>
              <UserTableHead order={order} orderBy={orderBy} numSelected={selected.length} rowCount={filteredUsers.length} onRequestSort={handleRequestSort} onSelectAllRows={handleSelectAllRows(filteredUsers.map(row => row.id))} />

              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => <UserLeaderTableRow key={user.id} user={user} isSelected={isSelected(user.id)} handleSelectRow={handleSelectRow} handleDeleteUser={handleDeleteUser} />)}

                {filteredUsers.length === 0 && <TableDataNotFound />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {
        /* PAGINATION SECTION */
      }
        <Box padding={1}>
          <TablePagination page={page} component="div" rowsPerPage={rowsPerPage} count={filteredUsers.length} onPageChange={handleChangePage} rowsPerPageOptions={[5, 10, 25]} onRowsPerPageChange={handleChangeRowsPerPage} />
        </Box>
      </Card>
    </Box>;
};

export default UserLeaderPageView;