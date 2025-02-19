import { Avatar, Box, Button, Card, Stack } from "@mui/material";
import { nanoid } from "nanoid";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";

const DATA = [{
        id: nanoid(),
        title: "Twitter",
        subtitle: "Social Media",
        image: "/static/social-media/twitter.svg",
        link : "https://www.instagram.com/iptv4me"
    }, {
        id: nanoid(),
        title: "Linked In",
        subtitle: "Social Media",
        image: "/static/social-media/027-linkedin.svg",
        link : "#"
    }, {
        id: nanoid(),
        title: "Dribble",
        subtitle: "Community",
        image: "/static/social-media/dribble.svg",
        link : "#"
    }, {
        id: nanoid(),
        title: "Facebook",
        subtitle: "Social Media",
        image: "/static/social-media/036-facebook.svg",
        link : "https://www.facebook.com/iptv4me"
    }, {
        id: nanoid(),
        title: "Instagram",
        subtitle: "Community",
        image: "/static/social-media/029-instagram.svg",
        link : "https://www.instagram.com/iptv4me"
}];

const SocialMedia = () => {
  return <Card sx={{
    p: 3,
    height: "100%"
  }}>
      <FlexBetween mb={4}>
        <Box>
          <Paragraph ellipsis lineHeight={1.3} fontSize={18} fontWeight={500}>
            Social Media Links
          </Paragraph>

          <Paragraph color="text.secondary">Users from all channels</Paragraph>
        </Box>
      </FlexBetween>

      <Stack spacing={4}>
        {DATA.map(({
        id,
        image,
        title,
        subtitle,
        link,
      }) => <FlexBetween key={id}>
            <FlexBox gap={1.5} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                <Avatar variant="rounded" alt={title} src={image} />

                <Box textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
                    <Paragraph ellipsis fontSize={16} lineHeight={1} fontWeight={600}>
                    {title}
                    </Paragraph>

                    <Small ellipsis fontWeight={500} color="text.secondary">
                    {subtitle}
                    </Small>
                </Box>
            </FlexBox>
            <Button color="secondary"><a href={link}>View</a></Button>
          </FlexBetween>)}
      </Stack>
    </Card>;
};

export default SocialMedia;