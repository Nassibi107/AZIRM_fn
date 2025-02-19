import { Badge, Box, Button, Chip } from "@mui/material"; // CUSTOM COMPONENTS

import { Paragraph } from "@/components/typography";
import { FlexRowAlign } from "@/components/flexbox";
import { AvatarLoading } from "@/components/avatar-loading";

import useAuth from "@/hooks/useAuth";
const UserAccount = () => {
  const {
    user
  } = useAuth();
  return <FlexRowAlign flexDirection="column" py={2}>
      <Badge badgeContent={user?.role} color="primary">
        <AvatarLoading alt="user" percentage={60} src="/static/user/user-11.png" sx={{
        width: 50,
        height: 50
      }} />
      </Badge>

      <Box textAlign="center" pt={1} pb={3}>
        {/* <Chip variant="outlined" label="60% Complete" size="small" /> */}
       {
        <Paragraph fontSize={16} fontWeight={600} mt={1}>
            {user.username}
       </Paragraph>
       }
        {/* <Paragraph fontSize={13} fontWeight={500} color="text.secondary" mt={0.5}>
          aaron@example.com
        </Paragraph> */}
      </Box>

      {/* <Button>Upgrade to Pro</Button> */}
    </FlexRowAlign>;
};

export default UserAccount;
