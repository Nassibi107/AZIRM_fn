import { Box, Button, Card, Grid, TextField , useTheme} from "@mui/material";
import { useState } from "react";
import { FlexBetween } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { isDark } from "@/utils/constants";
import { StatusBadge } from "@/components/status-badge";

const Voucher = () => {
  const theme = useTheme();
  const [voucher , setVoucher] = useState()
  return <Card sx={{p: 3,height: "100%"}}>
        <FlexBetween mb={4}>
          <Box>
            <Paragraph fontSize={18} fontWeight={500}>Voucher</Paragraph>
          </Box>
        </FlexBetween>
      <Box p={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FlexBetween spacing={4}>
              <TextField fullWidth type="text" variant="outlined" name="currentPassword" label="Voucher" onChange={(v)=>{setVoucher(v.target.value)}} value={voucher} />
              <Button type="submit" sx={{ mx : 1 }}>Save</Button>
            </FlexBetween>
          </Grid>
          <Grid item xs={12}>
            <FlexBetween sx={{borderRadius: 3 , my : 1 , backgroundColor: isDark(theme) ? "grey.700" : "primary.25"}}>
              <Box pl={3}>
                <Paragraph fontSize={16} fontWeight={600}>
                  1 Year 
                </Paragraph>
                <Paragraph color="text.secondary" fontWeight={500}>
                  72abf7b6-7378-476e-8aca-081f02acec9c
                </Paragraph>
              </Box>
              <StatusBadge type="success" sx={{ my : 4 , mx : 2 }}>
                100 %
              </StatusBadge>
            </FlexBetween>
            <FlexBetween sx={{borderRadius: 3, my : 1 ,backgroundColor: isDark(theme) ? "grey.700" : "primary.25"}}>
              <Box pl={3}>
                <Paragraph fontSize={16} fontWeight={600}>
                  1 Year 
                </Paragraph>
                <Paragraph color="text.secondary" fontWeight={500}>
                  da2dc4df-f5ee-49e0-b911-347b4e21d750
                </Paragraph>
              </Box>
              <StatusBadge type="success" sx={{ my : 4 , mx : 2 }}>
                100 %
              </StatusBadge>
            </FlexBetween>
          </Grid>
        </Grid>
      </Box>
    </Card>;
};

export default Voucher;