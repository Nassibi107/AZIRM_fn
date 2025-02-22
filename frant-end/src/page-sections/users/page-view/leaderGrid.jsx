import { useEffect, useState } from "react";
import { Avatar, Box, Card, Grid, IconButton, Pagination, Stack } from "@mui/material"; // CUSTOM COMPONENTS

import FlexBetween from "@/components/flexbox/FlexBetween";
import { H6, Paragraph } from "@/components/typography"; // CUSTOM PAGE SECTION COMPONENTS

import SearchArea from "../SearchArea";
import UserDetails from "../UserDetails"; // CUSTOM ICON COMPONENT

import MoreVertical from "@/icons/MoreVertical"; // CUSTOM UTILS METHOD

import { paginate } from "@/utils/paginate"; // CUSTOM DUMMY DATA
import axios from "axios";
const VITE_LEADER= import.meta.env.VITE_LEADER_URL;

const leaderGrid = () => {
  const [userPerPage] = useState(21);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // handle select

  const handleSelectItem = (id) => {
    const selectedUser = users.find(user => user.id === id);
    setSelectedItem(selectedUser);
  }; // active select item

  const activeItem = id => selectedItem?.id === id;

  const _getUser = async () => {
    try {
      const res = await axios.get(`${VITE_LEADER}/users`);
      setUsers(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    _getUser();
  }, []); // Empty dependency array ensures this runs only once

  let filteredUsers = users.filter(item => {
    if (searchValue) return item.firstName.toLowerCase().includes(searchValue.toLowerCase());
    else return true;
  });

  return (
    <Box pt={2} pb={4}>
      <Grid container>
        <Grid item lg={9} md={8} xs={12}>
          <Card
            sx={{
              px: 3,
              height: "100%",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <SearchArea
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              gridRoute="/ouser-grid"
              listRoute="/ousers"
            />

            <Grid container spacing={3}>
              {paginate(page, userPerPage, filteredUsers).map((item, index) => (
                <Grid item lg={4} sm={6} xs={12} key={index}>
                  <Box
                    onClick={() => handleSelectItem(item.id)}
                    sx={{
                      padding: 2,
                      borderRadius: 2,
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.4s",
                      backgroundColor: activeItem(item.id) ? "primary.main" : "transparent",
                    }}
                  >
                    <FlexBetween>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box>
                          <H6 fontSize={14} color={activeItem(item.id) ? "white" : "text.primary"}>
                            {item.firstName} {item.lastName}
                          </H6>
                          <Paragraph color={activeItem(item.id) ? "white" : "text.secondary"}>
                            {item.position}
                          </Paragraph>
                        </Box>
                      </Stack>
                      <IconButton sx={{ padding: 0 }}>
                        <MoreVertical
                          fontSize="small"
                          sx={{ color: activeItem(item.id) ? "white" : "text.secondary" }}
                        />
                      </IconButton>
                    </FlexBetween>
                  </Box>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Stack alignItems="center" marginY={2}>
                  <Pagination
                    shape="rounded"
                    count={Math.ceil(filteredUsers.length / userPerPage)}
                    onChange={(_, newPage) => {
                      setPage(newPage);
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item lg={3} md={4} xs={12}>
          {selectedItem && <UserDetails data={selectedItem} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default leaderGrid;