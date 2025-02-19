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
  
    return <Box pt={2} pb={4}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Cards/>
      </Grid>
      <Grid item md={9} xs={12}>
        <Transactions />
      </Grid>
      <Grid item md={3} xs={12}>
        <Earnings />
      </Grid>
      <Grid item md={6} xs={12}>
        <Games/>
      </Grid>
      <Grid item md={6} xs={12}>
        <RewardsPrograms/>
      </Grid>
    </Grid>
  </Box>;
}

export default index