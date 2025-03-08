import { Avatar, Badge, Box, Card, Stack } from "@mui/material";
import { nanoid } from "nanoid"; // CUSTOM COMPONENTS

import { MoreButton } from "@/components/more-button";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox"; // CUSTOM UTILS METHODS

import { format } from "@/utils/currency";
import { numberFormat } from "@/utils/numberFormat"; // CUSTOM DUMMY DATA

import axios  from "axios";
import { useEffect, useState } from "react";
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const DATA = [{
  id: nanoid(),
  totalSold: 13440,
  totalAmount: 350000,
  // country: "/static/flags/usa-round.png",
  user: {
    name: "Gage Paquette",
    // image: "/static/user/user-11.png"
  }
}, {
  id: nanoid(),
  totalSold: 10240,
  totalAmount: 148000,
  // country: "/static/flags/uk-round.png",
  user: {
    name: "Lara Harvey",
    image: "/static/user/user-16.png"
  }
}, {
  id: nanoid(),
  totalSold: 10240,
  totalAmount: 148000,
  // country: "/static/flags/germany-round.png",
  user: {
    name: "Evan Scott",
    image: "/static/user/user-17.png"
  }
}, {
  id: nanoid(),
  totalSold: 10240,
  totalAmount: 148000,
  // country: "/static/flags/spain-round.png",
  user: {
    name: "Benja Johnston",
    image: "/static/user/user-18.png"
  }
}];

const TopSeller = () => {
  
  const [emp ,setEmp] = useState();
  
  
  const _getEmployee = async () => {
    try{
      const res = await axios.get(`${ADMIN_ROUTE}/top-leaders`);
      setEmp(res.data.slice(0, 5));

    }catch(error)
    {
      console.error(error);
    }
  }
  useEffect(() => {_getEmployee()}, []);

  return <Card sx={{
    p: 3,
    height: "100%"
  }}>
      <FlexBetween>
        <Paragraph fontSize={18} fontWeight={500}>
          Top volunteer
        </Paragraph>

        <MoreButton size="small" />
      </FlexBetween>

      <FlexBetween mt={3} mb={2}>
        <Paragraph color="text.secondary" fontWeight={500}>
          Profile
        </Paragraph>
        <Paragraph color="text.secondary" fontWeight={500}>
          Items donation
        </Paragraph>
      </FlexBetween>

      <Stack spacing={2.5}>
        {emp?.map(item => <FlexBetween key={item.id}>
            <FlexBox gap={1.5}>
              <Badge overlap="circular" anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }} badgeContent={<Avatar alt="Remy Sharp" src={item.id} sx={{
            all: "unset",
            width: 17,
            height: 17
          }} />}>
                <Avatar alt={item.name} src={""} sx={{
              width: 45,
              height: 45
            }} />
              </Badge>

              <Box>
                <Small fontWeight={500} color="text.secondary">
                 {item.id}
                </Small>

                <Paragraph lineHeight={1} fontWeight={600}>
                  {item.name}
                </Paragraph>
              </Box>
            </FlexBox>

            <Paragraph fontWeight={500} color="text.secondary">
              {numberFormat(item.totalPayments)}
            </Paragraph>
          </FlexBetween>)}
      </Stack>
    </Card>;
};

export default TopSeller;