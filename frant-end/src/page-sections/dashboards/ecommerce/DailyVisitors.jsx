import { Avatar, AvatarGroup, Box, Card } from "@mui/material"; // CUSTOM COMPONENTS

import { FlexBox } from "@/components/flexbox";
import { Percentage } from "@/components/percentage";
import { H6, Paragraph } from "@/components/typography"; // CUSTOM UTILS METHOD

import { numberFormat } from "@/utils/numberFormat";

const DailyVisitors = () => {
  return <Card sx={{
    p: 3
  }}>
      <Box>
        <FlexBox alignItems="center" gap={1}>
          <H6>{numberFormat(13)}</H6>
          <Percentage type="primary">+12.5%</Percentage>
        </FlexBox>

        <Paragraph color="text.secondary">Daily  leaders</Paragraph>
      </Box>

      <Box mt={7}>
        <Paragraph mb={0.5} fontWeight={500}>
          Top leaders
        </Paragraph>

        <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="/static/user/user-11.png" />
          <Avatar alt="Travis Howard" src="/static/user/user-10.png" />
          <Avatar alt="Cindy Baker" src="/static/user/user-13.png" />
          <Avatar alt="Agnes Walker" src="/static/user/user-14.png" />
          <Avatar alt="Trevor Henderson" src="/static/user/user-15.png" />
          <Avatar alt="Trevor Henderson" src="/static/user/user-15.png" />
        </AvatarGroup>
      </Box>
    </Card>;
};

export default DailyVisitors;