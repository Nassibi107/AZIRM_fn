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



const API_URLS = import.meta.env.VITE_LV_URL;
function EditPackComplex(
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
    const [bouquetCategory , setBouquetCategory] = useState(true)
    const handleChangeBouquetCategory = () => {
        setBouquetCategory(!bouquetCategory)
        setOnlyBouquet(false)
        setOnlyCat(false)
    }
    const [onlyBouquet , setOnlyBouquet] = useState(false)
    const handleChangeOnlyBouquet = () => {
        setOnlyBouquet(!onlyBouquet)
        setBouquetCategory(false)
        setOnlyCat(false)
    }
    const [onlyCat , setOnlyCat] = useState(false)
    const handleChangeCat = () => {
        setOnlyCat(!onlyCat)
        setBouquetCategory(false)
        setOnlyBouquet(false)
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
            if (type == "onlybouquet")
                BouquetsIDs = selectedIds.concat([...selectedSerieIds ,...selectedMovieIds]);
            else if(type == "bouquetCategory")
                BouquetsIDs = childData;
            else if(type == "onlyCat")
                {
                    BouquetsIDs = selectCate;
                    console.log(BouquetsIDs);
                }
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
        
            <Grid item sm={4} xs={12} >
                  
                    <FlexBetween alignItems="center" flexDirection="column" sx={{ cursor : "pointer" , padding: 2, border: "1px solid" , borderColor: bouquetCategory ? "primary.main" : "secondary.main" , borderRadius : '5px' }} onClick={handleChangeBouquetCategory}>
                            <Box sx={{textAlign : "center"}}>
                                <Paragraph fontWeight={500}>Bouquets & Category</Paragraph>
                                <Radio value={bouquetCategory}  checked={bouquetCategory ? true : false}/>
                            </Box>
                     </FlexBetween>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <FlexBetween alignItems="center" flexDirection="column" sx={{ cursor : "pointer" , padding: 2, border: "1px solid" , borderColor: onlyBouquet ? "primary.main" : "secondary.main" , borderRadius : '5px' }} onClick={handleChangeOnlyBouquet} >
                            <Box sx={{textAlign : "center"}}>
                                <Paragraph fontWeight={500}>Only Bouquets </Paragraph>
                                <Radio value={onlyBouquet} checked={onlyBouquet ? true : false}/>
                            </Box>
                        </FlexBetween>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <FlexBetween alignItems="center" flexDirection="column" sx={{ cursor : "pointer" , padding: 2, border: "1px solid" , borderColor: onlyCat ? "primary.main" : "secondary.main" , borderRadius : '5px' }} onClick={handleChangeCat} >
                            <Box sx={{textAlign : "center"}}>
                                <Paragraph fontWeight={500}>Only Category</Paragraph>
                                <Radio value={onlyCat} checked={onlyCat ? true : false}/>
                            </Box>
                        </FlexBetween>
                    </Grid>


  <Box margin={5}>
    <Divider sx={{"marginBottom" : "10px"}}/>

  <Grid container spacing={5} >
    {
        bouquetCategory && (<BouquetCategory
            setbouquetLiveApi= {(v)=> {setbouquetLiveApi(v)}}
            setbouquetSerieApi= {(v)=> {setbouquetSerieApi(v)}}
            bouquetSerieApi={bouquetSerieApi}
            bouquetLiveApi={bouquetLiveApi}
            bouquetMovieApi={bouquetMovieApi}
            bouquetLiveFilter={bouquetLiveFilter}
            selectedSerieIds= {selectedSerieIds}
            selectedMovieIds= {selectedMovieIds}
            selectedIds= {selectedIds}
            onChangeIdLive = {(v) => {setSelectedIds(v)}}
            onChangeIdSerie = {(v) => {setSelectedSerieIds(v)}}
            onChangeIdMovie = {(v) => {setSelectedMovieIds(v)}}
            idPack = {id} 
            onChangeChild = {(data)=>setChildData(data)}
            />)
    }

    {
        onlyBouquet && (<OnlyBouquet
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
            />)
    }
    {
        onlyCat && (<OnlyCategorie
            bouquetSerieApi={bouquetSerieApi}
            bouquetLiveApi={bouquetLiveApi}
            bouquetMovieApi={bouquetMovieApi}
            setbouquetLiveApi= {setbouquetLiveApi}
            bouquetLiveFilter={bouquetLiveFilter}
            idPack = {id} 
            onChangeCategorie = {(data) => {setSelectCate(data)} 
                }
            />)
    }
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
        {
  onlyCat ? (
    <Grid item sm={12} xs={12}>
      <Button variant="contained" onClick={() => onSave("onlyCat")}>save</Button>
    </Grid>
  ) : onlyBouquet ? (
    <Grid item sm={12} xs={12}>
      <Button variant="contained" onClick={() => onSave("onlybouquet")}>save</Button>
    </Grid>
  ) : (
    <Grid item sm={12} xs={12}>
      <Button variant="contained" onClick={() => onSave("bouquetCategory")}>save</Button>
    </Grid>
  )
}
 </>
}

export default EditPackComplex
