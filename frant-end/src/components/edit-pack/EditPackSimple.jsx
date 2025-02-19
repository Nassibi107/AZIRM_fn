import React, { useEffect, useState } from 'react'

import {  Box, Button, Card, Divider, TextField , Grid, Switch, Radio , List, ListItem, Paper, CircularProgress, Alert } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";

import {Paragraph } from "@/components/typography";


import axios from 'axios';
import BouquetCategory from './Tools/BouquetCategory';
import OnlyBouquet from './Tools/OnlyBouquet';
import OnlyCategorie from './Tools/OnlyCategorie';
import Policy from '../helpers/Policy';
import { ContactSupportOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';



const API_URLS = import.meta.env.VITE_LV_URL;
function EditPackSimple(
{
    id, policy,name ,credit ,
    periodType ,period , isTrial ,
    maxConnection,onSetMessage,onSetSeverity,
    RefundData
})
{
    const [policyData , setPolicyData] = useState([]);
    const [search , setSearch] = useState('');
    const [bouquetLiveApi, setbouquetLiveApi] = useState([]);
    const [bouquetSerieApi, setbouquetSerieApi] = useState([]);
    const [bouquetMovieApi, setbouquetMovieApi] = useState([]);
    const [selectedSerieIds, setSelectedSerieIds] = useState([]);
    const [selectedMovieIds, setSelectedMovieIds] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [childData, setChildData] = useState([]);
    const [selectCate, setSelectCate] = useState([]);
    const [retiveInfoBq , setRetiveInfoBq] = useState({});
     const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const getBouquetsApi = async () => {
        try
        {
            const  resBqLive =  await axios.get(`${API_URLS}/bouquets?filters[type]=live`) ;
            const  resBqSeries =  await axios.get(`${API_URLS}/bouquets?filters[type]=serie`) ;
            const  resBqMovie =  await axios.get(`${API_URLS}/bouquets?filters[type]=movie`) ;
            const [LiveIds , SerieIds , MoviesIds ] = await Promise.all([
                axios.get(`${API_URLS}/packages/${id}/bouquets?filters[type]=live`),
                axios.get(`${API_URLS}/packages/${id}/bouquets?filters[type]=serie`),
                axios.get(`${API_URLS}/packages/${id}/bouquets?filters[type]=movie`)
            ])
          
            setbouquetLiveApi(resBqLive.data.data);
            setbouquetSerieApi(resBqSeries.data.data);
            setbouquetMovieApi(resBqMovie.data.data);
            setSelectedIds(
                LiveIds.data.data.map(item => item.id)
            )
            setSelectedSerieIds(
                SerieIds.data.data.map(item => item.id)
            )
            setSelectedMovieIds(
                MoviesIds.data.data.map(item => item.id)
            )
        }catch(error)
        {
            console.log(error);
        }

    }

    const [showForallResellers , setShowForallResellers] = useState(false)
    const handleChangeShowForAllRes = () => {
        setShowForallResellers(!showForallResellers)
    }
   
    const [searchBouquet , setSearchBouquet] = useState("")
    const handleChangeSearchBouquet = (e) => {
        setSearchBouquet(e.target.value)
    }
    
    useEffect(() => {getBouquetsApi()},[]);
    const onSave = async (type) => {
        try
        {
            
            let BouquetsIDs = [];
            const passedDays = [policyData.map(item => item.passedDays)];
            const refundAmount = [policyData.map(item => item.refundAmount)];
                BouquetsIDs = childData;
                const refund_data = {
                    refund_policies: passedDays.map((passed_day, index) => ({
                        passed_days: passed_day,
                        refund_amount: refundAmount[index]
                    }))
                }
                const data = {
                    name: name,
                    is_trial: isTrial,
                    is_paid_trial: 0,
                    credit: credit,
                    period: parseInt(period),
                    period_type: periodType,
                    max_connections: parseInt(maxConnection),
                    bouquets: [...BouquetsIDs],
                };
                const rep = await axios.put(`${API_URLS}/packages/${id}`, data , {
                headers: {
                  'Content-Type': 'application/json'
                }
              }) 
              console.log(RefundData.id);
            // const repRp = await axios.post(`${API_URLS}/packages/${id}/refund-policies/${RefundData.id}`, data , {
            //     headers: {
            //       'Content-Type': 'application/json'
            //     }
            //   })
              onSetMessage("the packege has updated successfuly !");
              onSetSeverity("success");
        }
         catch(error)
        {
            onSetMessage(error.response.data.message || "Failed to update role.");
            onSetSeverity("error");
        }
        console.log(policyData.map(item => [item.passedDays, item.refundAmount]));
    }
    const getBouquetsForSection = () => {
        return bouquetLiveApi.filter(item => item.bouquet_name.toLowerCase().includes(searchBouquet.toLowerCase()));
    };
    const bouquetLiveFilter  = bouquetLiveApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(search?.toLocaleLowerCase())
    )

  return  <>

  <Box margin={5}>
    <Divider sx={{"marginBottom" : "10px"}}/>
  <Grid container spacing={5} >
   <OnlyBouquet
            isDarkMode={isDarkMode} 
            bouquetSerieApi={bouquetSerieApi}
            bouquetLiveApi={bouquetLiveApi}
            bouquetMovieApi={bouquetMovieApi}
            setbouquetLiveApi= {(v)=> {setbouquetLiveApi(v)}}
            setbouquetSerieApi= {(v)=> {setbouquetSerieApi(v)}}
            bouquetLiveFilter={bouquetLiveFilter}
            selectedIds= {selectedIds}
            selectedSerieIds= {selectedSerieIds}
            selectedMovieIds= {selectedMovieIds}
             onChangeIdLive = {(v) => {setSelectedIds(v)}}
             onChangeIdSerie = {(v) => {setSelectedSerieIds(v)}}
             onChangeIdMovie = {(v) => {setSelectedMovieIds(v)}}
            />
        <Grid>
    </Grid>
         { policy  &&  (<Grid container marginTop={5}>
                  <Grid item sm={1} xs={1}></Grid>
                <Grid item sm={10} xs={10}>
                    <Divider >Refund Policy </Divider>
                    <Policy onGetPolicy = {(v) => setPolicyData(v) } RefundData={RefundData} />
                    <Divider />
                </Grid>
                <Grid item sm={1}  xs={1}></Grid>
                </Grid>)}
        <Divider />
        </Grid>
        </Box>
        <Grid item sm={12} xs={12}>
        <Button variant="contained" onClick={() => onSave()}>save</Button>
        </Grid>
 </>
}

export default EditPackSimple
