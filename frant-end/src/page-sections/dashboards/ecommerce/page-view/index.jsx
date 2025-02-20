import { Box, Grid } from "@mui/material"; // CUSTOM PAGE SECTION COMPONENTS

import Order from "../Order";
import Sales from "../Sales";
import Footer from "../../_common/Footer";
import Earnings from "../Earnings";
import TopSeller from "../TopSeller";
import DailySales from "../DailySales";
import ReturnRate from "../ReturnRate";
import TopProducts from "../TopProducts";
import RecentOrders from "../RecentOrders";
import DailyVisitors from "../DailyVisitors";
import CustomerReview from "../CustomerReview";
import { useEffect } from "react";

const EcommercePageView = () => {
  
  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>
        {
        /* DAILY VISITORS CARD */
      }
        <Grid item lg={4} sm={6} xs={12}>
          <DailyVisitors />
        </Grid>

  

        {
        /* ORDER THIS MONTH CARD */
      }
        <Grid item lg={4} sm={6} xs={12}>
          <Order />
        </Grid>

        {
        /* MONTHLY EARNINGS CARD */
      }
        <Grid item lg={4} sm={6} xs={12}>
          <Earnings />
        </Grid>

   
        <Grid item md={8} xs={12}>
          <Sales />
        </Grid>    
        {
        /* TOP SELLER CARD */
      }
        <Grid item md={4} xs={12}>
          <TopSeller />
        </Grid>

      </Grid>
    </Box>;
};

export default EcommercePageView;