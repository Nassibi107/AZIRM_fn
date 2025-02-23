import React, { useEffect } from 'react'
import { Alert, Box, Grid } from "@mui/material";
import Cards from '../Cards';
import Transactions from '../Transactions';
import SocialMedia from '../SocialMedia';
import LatestMovies from '../LatestMovies';
import LatestSeries from '../LatestSeries';
import LatestLiveStream from '../LatestLiveStream';
import ClientInfo from '../ClientInfo';
import Games from '../Games';
import Earnings from '../Earnings';
import RewardsPrograms from '../RewardsPrograms';

const index = () => {

  useEffect(() => {
    console.log('Dashboard Page');
    window.location.reload();
  }, []); 
  
    return <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Cards/>
      </Grid>
      <Grid item md={6} xs={6}>
        <Transactions />
      </Grid>
      <Grid item md={6} xs={6}>
        <Earnings />
      </Grid>
      <Grid item md={6} xs={6}>
        <Games/>
      </Grid>
      <Grid item md={6} xs={6}>
        <RewardsPrograms/>
      </Grid>
    </Grid>
  </Box>;
}

export default index