
import { Box, Card, Table, Avatar, TableRow, TableBody, TableHead, IconButton, TablePagination } from "@mui/material";
import { Email, Schedule, Tune } from "@mui/icons-material";
import { nanoid } from "nanoid";
import { format } from "date-fns"; // CUSTOM COMPONENTS
import React from "react";

import { Scrollbar } from "@/components/scrollbar";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox"; // COMMON DASHBOARD RELATED COMPONENTS
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
import { BodyTableCell, HeadTableCell } from "../_common"; // CUSTOM DUMMY DATA SET
import axios from 'axios'
const DATA = [
  {
  id: nanoid(),
  email : "user1@gmail.com",
  total: 356.25,
  createdAt: new Date("August 31, 2022 10:30:00"),
  user: {
    id: nanoid(),
    name: "Arikunn",
    image: "/static/user/user-13.png"
  }
}, {
  id: nanoid(),
  email : "user2@gmail.com",
  total: 165.58,
  createdAt: new Date("february 30, 2025 13:30:00"),
  user: {
    id: nanoid(),
    name: "Ikauwis",
    image: "/static/user/user-14.png"
  }
}, {
  id: nanoid(),
  total: 463.25,
  email : "user3@gmail.com",
  createdAt: new Date("february 29, 2025 19:30:00"),
  user: {
    id: nanoid(),
    name: "Dayet",
    // image: "/static/user/user-15.png"
  }
}, {
  id: nanoid(),
  total: 185.58,
  email : "user4@gmail.com",
  createdAt: new Date("february 28, 2025 16:30:00"),
  user: {
    id: nanoid(),
    name: "Ikauwis",
    // image: "/static/user/user-13.png"
  }
}
,
  {
  id: nanoid(),
  email : "user1@gmail.com",
  total: 356.25,
  createdAt: new Date("August 31, 2022 10:30:00"),
  user: {
    id: nanoid(),
    name: "Arikunn",
    image: "/static/user/user-13.png"
  }
}, {
  id: nanoid(),
  email : "user2@gmail.com",
  total: 165.58,
  createdAt: new Date("february 30, 2025 13:30:00"),
  user: {
    id: nanoid(),
    name: "Ikauwis",
    image: "/static/user/user-14.png"
  }
}, {
  id: nanoid(),
  total: 463.25,
  email : "user3@gmail.com",
  createdAt: new Date("february 29, 2025 19:30:00"),
  user: {
    id: nanoid(),
    name: "Dayet",
    // image: "/static/user/user-15.png"
  }
}, {
  id: nanoid(),
  total: 185.58,
  email : "user4@gmail.com",
  createdAt: new Date("february 28, 2025 16:30:00"),
  user: {
    id: nanoid(),
    name: "Ikauwis",
    // image: "/static/user/user-13.png"
  }
}];


const CustomerTransaction = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [teamMembers, setTeamMembers] = React.useState([]);
  const ACCESS_TOKEN = "EAAAl2oUOJeHSN6BXjHx38sA03IFI2qSQ6VCL4kkxRLnLdqXzYIC6EkEWs-ZlNPo"; // Store this securely

  React.useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          `${ADMIN_ROUTE}/team-members`
 

        );
        console
        setTeamMembers(response.data.team_members);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
    
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page is changed
  };

  const getColor = index => {
    return index % 2 === 1 ? "action.selected" : "transparent";
  };

  // Slice data to only show the rows for the current page
  const currentPageData = DATA.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card>
      <FlexBetween p={3}>
        <Paragraph fontSize={18} fontWeight={500}>
          Customer Transactions
        </Paragraph>

        <FlexBox gap={1}>
          <Paragraph
            lineHeight={1}
            sx={{
              gap: 1,
              display: "flex",
              borderRadius: 1.5,
              color: "grey.500",
              alignItems: "center",
              padding: ".25rem .5rem",
              backgroundColor: "action.selected",
            }}
          >
            <Schedule fontSize="small" /> 02 Jun - 15 Feb
          </Paragraph>

          <IconButton color="secondary">
            <Tune />
          </IconButton>
        </FlexBox>
      </FlexBetween>

      <Scrollbar>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>TRANSACTION</HeadTableCell>
              <HeadTableCell>Email</HeadTableCell>
              <HeadTableCell>DATE</HeadTableCell>
              <HeadTableCell>TIME</HeadTableCell>
              <HeadTableCell>AMOUNT</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentPageData.map((item, index) => (
              <TableRow key={index} sx={{ backgroundColor: getColor(index) }}>
                <BodyTableCell>
                  <FlexBox gap={1}>
                    <Avatar variant="rounded" src={item.user.image} />
                    <Box>
                      <Paragraph color="text.primary" fontWeight={500}>
                        {item.user.name}
                      </Paragraph>
                      <Small>{item.user.id.substring(0, 10)}</Small>
                    </Box>
                  </FlexBox>
                </BodyTableCell>

                <BodyTableCell>{item.email}</BodyTableCell>
                <BodyTableCell>{format(new Date(item.createdAt), "dd MMM, yyyy")}</BodyTableCell>
                <BodyTableCell>{format(new Date(item.createdAt), "hh:mm a")}</BodyTableCell>

                <BodyTableCell>
                  <Paragraph color="text.primary" fontWeight={500}>
                    ${item.total}
                  </Paragraph>
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={DATA.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default CustomerTransaction;


