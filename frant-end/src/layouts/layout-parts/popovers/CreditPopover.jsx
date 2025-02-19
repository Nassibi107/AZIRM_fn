import { Fragment, useRef, useState } from "react";
import { Badge, Box, Typography } from "@mui/material";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { Small } from "@/components/typography";
import Card from "@/icons/Card";
import useAuth from "@/hooks/useAuth";

const CreditPopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { user } = useAuth();


  const CREDIT = [{
    id: user.id,
    sold: user.credit
  }];

  return (
    <>
    {
      user?.credit ? <Fragment>
       { CREDIT.map(credit => (
        <ListItem key={credit.id} title={credit.sold} styleIf="primary" />
      ))}
    </Fragment>
    :<Fragment>
       { CREDIT.map(credit => (
        <ListItem key={credit.id} title={"0"} styleIf="error" />
      ))}
    </Fragment> }</>
  );
};

function ListItem({ title, styleIf }) {
  return (
    <FlexBox 
      p={2} 
      gap={2} 
      alignItems="center" 
      sx={{ cursor: "pointer" }}
    >
      <Badge 
        badgeContent={title} 
        color={styleIf} 
        sx={{ mr: 2 }}
      >
        <FlexBetween gap={1}>
          <Box>
            <Typography variant="body1" fontWeight="bold">
              Credit
            </Typography>
          </Box>
          {
           title == "0" ? <Box sx={{color : "red"}}>
            <Card />
          </Box> 
           : <Box >
            <Card />
          </Box> }
        </FlexBetween>
      </Badge>
    </FlexBox>
  );
}

export default CreditPopover;
