
import React from 'react'

import { Badge, Box, Button, Card, CardContent ,Divider,Grid} from '@mui/material'
import CardLeft from './CardLeft'
import CardRight from './CardRight'
import { FlexBetween} from '@/components/flexbox'



function Ticketc({header , OnDelete }) {

  const ft_Delete = () =>  
    {
      OnDelete(0);
    };
  return <Card  >
  <CardContent>
    <Box>
      <Grid container>
        <Grid item md={12} sm={12} xs={12} >
         <Box sx = {{backgroundColor : "#7e68e0" , color :"#fff", padding:"5px"}}>
         <FlexBetween>
                <p>ticket</p>
              <Button  onClick={ft_Delete} variant='outline'>X</Button>
              </FlexBetween>
         </Box>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
         <Divider />
        <CardLeft />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
         <Divider />
        <CardRight />
        </Grid>
      </Grid>
    </Box>
  </CardContent>
</Card>
}

export default Ticketc