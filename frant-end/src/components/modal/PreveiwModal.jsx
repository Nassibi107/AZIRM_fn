import { Divider, Grid, FormControl, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, FormLabel, Select, MenuItem, Button, Box, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { useState } from "react";

const PreviewModal = ({item, typeS }) => {
  return (
    <Box sx={{ p: 2}}>
        <Cheader item={item} />
      <Divider sx={{ my: 2 }} />
          <Ctable item={item} typeS={typeS}/>
      <Divider sx={{ my: 2 }} />
        <Ft_Bouquet/>
      <Divider sx={{ my: 2 }} />
            <Cfooter item={item} />
    </Box>
  );
}


const Cheader = ({ item}) =>
{
  return (
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <h1><b>IPTV 2</b></h1>
      {/* <h1><b>IPTV 2 :</b>{id}</h1> */}
      <h5><b>Identifier Infos : </b>{item.user_id}</h5>
      <h5><b>Usernames : </b>{item.username}</h5>
      <h5><b>Password : </b>{item.password}</h5>
      {/* <h5><b>MAC Address:</b>{Mac}</h5> */}
    </Grid>
    <Grid item xs={12} sm={6}>
      <h1><b>Subscription : #</b>{item.id}</h1>
      <h5><b>Date Issues : </b>{item.created_at}</h5>
      <h5><b>Date Experation : </b>{item.expired_at}</h5>
    </Grid>
  </Grid>
  )
}

const Cfooter = ({item}) => 
{
  return (
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <h3><b>note : </b>{item.note}</h3>
    </Grid>
    {/* <Grid item xs={12} sm={6}>
      <h5><b>Bouquet Live:</b>{}</h5>
      <h5><b>Bouquet Movies :</b>{}</h5>
      <h5><b>Total : </b>{}</h5>
    </Grid> */}
  </Grid>
  )
}

const Ctable = ({item, typeS}) => 
{
  return (
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ textAlign: 'center' }}>Status</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Payment Status</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Country</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Package</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Is Trial</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell sx={{ textAlign: 'center' }}><Button variant="outlined" sx = {{color : "green"}}>active</Button></TableCell>
          <TableCell sx={{ textAlign: 'center', color: item.customer_has_paid ? 'green' : 'red'}}>paid</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{item.country}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{item.package_id}</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>Not</TableCell>
          <TableCell sx={{ textAlign: 'center' }}>{typeS}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )
}

const Ft_Bouquet = () =>
  
  {
    const [Bouquet , setBouquet] = useState([
      {id: 1, reg: "OLYMPIC" },
      {id: 4, reg: "ARABIC"},
      {id: 50, reg: "AR BEIN GROUP"},
      {id: 55, reg: "AFRICA"},
      {id: 66, reg: "VIP | PPV-SPORT EVENTS"},
      {id: 68, reg: "VIP | CAF - AFC"},
      {id: 70, reg: "FRANCE"},
      {id: 85, reg: "SPAIN"},
      {id: 91, reg: "GERMANY"},
      {id: 96, reg: "PORTUGAL"},
      {id: 102, reg: "NETHERLANDS"},
      {id: 107, reg: "ITALY"},
      {id: 112, reg: "MALTA"},
      {id: 115, reg: "UNITED KINGDOM"},
      {id: 130, reg: "IRELAND"},
      {id: 133, reg: "AUSTRIA"}])
    return (<>  
    <Accordion  >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>BOUQUET LIVE</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {Bouquet.map((bq) => (
            <Typography key={bq.id}>{bq.reg}</Typography>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography> BOUQUET Movies</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <AccordionDetails>
        {Bouquet.map((bq) => (
            <Typography key={bq.id}>{bq.reg}</Typography>
          ))}
        </AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography> BOUQUET Series</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <AccordionDetails>
        {Bouquet.map((bq) => (
            <Typography key={bq.id}>{bq.reg}</Typography>
          ))}
        </AccordionDetails>
        </AccordionDetails>
      </Accordion>
      </>
    )
  }
export default PreviewModal;
