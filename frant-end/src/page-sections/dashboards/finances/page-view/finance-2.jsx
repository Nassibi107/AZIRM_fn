import { Box, Grid } from "@mui/material"; // CUSTOM PAGE SECTION COMPONENTS

import Balance from "../Balance";
import Footer from "../../_common/Footer";
import DebitCard from "../DebitCard";
import MySavings from "../MySavings";
import Transactions from "../Transactions";
import WalletSummery from "../WalletSummery";
import InvestmentTwo from "../InvestmentTwo";
import TopActivityTwo from "../TopActivityTwo";
import ExpenseHistory from "../ExpenseHistory";
import CurrentCurrencyTwo from "../CurrentCurrencyTwo";
import CustomerTransaction from "../CustomerTransaction";


const Finance2PageView = () => {
  return <Box pt={2} pb={4}>
      <Grid container spacing={3}>

        <Grid item md={6} xs={12}>
          <Balance />
        </Grid>


        <Grid item md={6} xs={12}>
          <CurrentCurrencyTwo />
        </Grid>
        <Grid item md={8} xs={12}>
          <Transactions type="line" />
        </Grid>

       
     <Grid item md={4} xs={12}>
          <DebitCard />
        </Grid>
        <Grid item md={12} xs={12}>
          <CustomerTransaction />
        </Grid>

      </Grid>
    </Box>;
};

export default Finance2PageView;