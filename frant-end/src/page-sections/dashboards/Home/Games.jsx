import { Card, Stack , Box , Grid} from "@mui/material";
import { TableDataNotFound } from "@/components/table";
import { H5 } from "@/components/typography";
import { FlexBetween } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { FlexRowAlign } from "@/components/flexbox";
import { useUserContext } from "@/contexts/UserContext";

const Games = () => {
    const {user} = useUserContext()
    console.log(user.name);
  return <Card sx={{p: 3}}>
    <FlexBetween>
        <Box>
            <Paragraph fontSize={18} fontWeight={500}> {user.name}</Paragraph>
        </Box>
    </FlexBetween>
    <Box>
        <Grid >
            <Grid item xs={12}>
            <FlexRowAlign m={2} fontSize={18} minHeight={300} fontWeight={700} borderRadius={2} bgcolor="action.selected">
          Data Not Found!
         
        </FlexRowAlign>
            </Grid>
        </Grid>
    </Box>
</Card>;
}

export default Games