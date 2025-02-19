import { Box, Card, CardContent ,Grid, TextField } from '@mui/material'
import { H4 } from '@/components/typography'
import React from 'react'
import { H6 } from '@/components/typography'
import { FlexBox } from '@/components/flexbox'



function CardLeft() {
  return (
     <Card sx={{borderRight : ".18em dashed #7e68eb" , borderRadius : "0" }}>
        <CardContent>
        <Grid 
          container 
          justifyContent="center" 
          alignItems="center"
          spacing={2}
        >
            <Grid item  md ={12}>
               <TextField
                value={"name"}
                aria-readonly
               />
                
            </Grid>
            <Grid item >
            <TextField
                value={"label"}
                aria-readonly
               />
                
            </Grid>
            <Grid item >
            <TextField
                value={"palceholder"}
                aria-readonly
               />
                
            </Grid>
        </Grid>
        </CardContent>

     </Card>
  )
}

export default CardLeft