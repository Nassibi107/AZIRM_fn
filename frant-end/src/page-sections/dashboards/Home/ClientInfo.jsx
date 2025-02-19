import { Box, Card, Table, Avatar, TableRow, TableBody, TableHead, IconButton, TableContainer } from "@mui/material";
import { Schedule, Tune } from "@mui/icons-material";
import { nanoid } from "nanoid";
import { format } from "date-fns";
import { MoreButton } from "@/components/more-button";
import { Scrollbar } from "@/components/scrollbar";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { StatusBadge } from "@/components/status-badge";
import { BodyTableCell, HeadTableCell } from "../_common";

const DATA = [{
    id: nanoid(),
    total: 356.25,
    createdAt: new Date("August 31, 2022 10:30:00"),
    package : 'Golden' ,
    resselerNotes : 'Notes...' ,
    status: "Pending",
    status_type: "warning",
    user: {
      id: nanoid(),
      name: "Arikunn",
      image: "/static/user/user-13.png"
    }
  }, {
    id: nanoid(),
    total: 165.58,
    createdAt: new Date("August 30, 2022 13:30:00"),
    package : 'Mega' ,
    resselerNotes : 'Notes...' ,
    status: "Shipped",
    status_type: "success",
    user: {
      id: nanoid(),
      name: "Ikauwis",
      image: "/static/user/user-14.png"
    }
  }, {
    id: nanoid(),
    total: 463.25,
    createdAt: new Date("August 29, 2022 19:30:00"),
    package : 'Golden' ,
    resselerNotes : 'Notes...' ,
    status: "Confirmed",
    status_type: "primary",
    user: {
      id: nanoid(),
      name: "Dayet",
      image: "/static/user/user-15.png"
    }
  }, {
    id: nanoid(),
    total: 185.58,
    createdAt: new Date("August 28, 2022 16:30:00"),
    package : 'Mega' ,
    resselerNotes : 'Notes...' ,
    status: "Rejected",
    status_type: "error",
    user: {
      id: nanoid(),
      name: "Ikauwis",
      image: "/static/user/user-13.png"
    }
}];

const ClientInfo = () => {
    const getColor = index => {
      return index % 2 === 1 ? "action.selected" : "transparent";
    };
  return <Card >
  <FlexBetween p={3}>
    <FlexBox gap={1}>
      <Paragraph lineHeight={1} sx={{
      gap: 1,
      display: "flex",
      borderRadius: 1.5,
      color: "grey.500",
      alignItems: "center",
      padding: ".25rem .5rem",
      backgroundColor: "action.selected"
    }}>
        <Schedule fontSize="small" /> 24 Aug - 31 Aug
      </Paragraph>

      <IconButton color="secondary">
        <Tune />
      </IconButton>
    </FlexBox>
  </FlexBetween>

  <TableContainer>
  <Scrollbar autoHide={false}>
    <Table sx={{
    minWidth: 900
  }}>
      <TableHead>
        <TableRow>
          <HeadTableCell>USER NAME</HeadTableCell>
          <HeadTableCell>EXPIRE DATE</HeadTableCell>
          <HeadTableCell>PACKAGE</HeadTableCell>
          <HeadTableCell>RESSELER NOTES</HeadTableCell>
          <HeadTableCell align="center">PAID</HeadTableCell>
          <HeadTableCell align="center">TABLE ACTIONS</HeadTableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {DATA.map((item, index) => <TableRow key={index} sx={{
        backgroundColor: getColor(index)
      }}>
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

            <BodyTableCell>{format(new Date(item.createdAt), "dd MMM, yyyy")}</BodyTableCell>
            <BodyTableCell>{item.package}</BodyTableCell>
            <BodyTableCell>{item.resselerNotes}</BodyTableCell>
            <BodyTableCell align="center">
              <StatusBadge type={item.status_type}>{item.status}</StatusBadge>
            </BodyTableCell>
            <BodyTableCell>
              <MoreButton size="small" />
            </BodyTableCell>
          </TableRow>)}
      </TableBody>
    </Table>
  </Scrollbar>
  </TableContainer>
</Card>;
}

export default ClientInfo