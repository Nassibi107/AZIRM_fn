import React, { useEffect, useState } from 'react'

import {  Box, Button, Card, Divider, TextField , Grid, Switch, Radio , List, ListItem, Paper, CircularProgress, Alert } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";

import {Paragraph } from "@/components/typography";

import axios from 'axios';
import BouquetCategory from './BouquetCategory';
import OnlyBouquet from './OnlyBouquet';
import OnlyCategorie from './OnlyCategorie';
import { Sync } from '@mui/icons-material';

const API_URLS = import.meta.env.VITE_LV_URL;
function GenBqRetirve({idPack , onChangePackge})
 {



    const [search , setSearch] = useState('');
    const [bouquetLiveApi, setbouquetLiveApi] = useState([]);
    const [bouquetSerieApi, setbouquetSerieApi] = useState([]);
    const [bouquetMovieApi, setbouquetMovieApi] = useState([]);
    const [selectedSerieIds, setSelectedSerieIds] = useState([]);
    const [selectedMovieIds, setSelectedMovieIds] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [childData, setChildData] = useState([]);
    const [selectCate, setSelectCate] = useState([]);


    const getBouquetsApi = async () => {
        try
        {
            const  resBqLive =  await axios.get(`${API_URLS}/packages/${idPack}/bouquets?filters[type]=live`) ;
            const  resBqSeries =  await axios.get(`${API_URLS}/packages/${idPack}/bouquets?filters[type]=serie`) ;
            const  resBqMovie =  await axios.get(`${API_URLS}/packages/${idPack}/bouquets?filters[type]=movie`) ;
            setbouquetLiveApi(resBqLive.data.data);
            setbouquetSerieApi(resBqSeries.data.data);
            setbouquetMovieApi(resBqMovie.data.data);
           
        }catch(error)
        {
            console.log(error);
        }

    }
    const arrHook = () => {
        console.log("sasa")
        if(onlyBouquet)
        {
            onChangePackge(selectedIds.concat[selectedSerieIds,selectedMovieIds]);
            console.log(selectedIds.concat[selectedSerieIds,selectedMovieIds])
        }
        else if (onlyCat)
          {
            onChangePackge(selectCate);
            console.log(selectCate)
          }
        else if (BouquetCategory)
            onChangePackge(childData);
        else 
            onChangePackge([]);
    }
    useEffect(() => {getBouquetsApi()},[]);
    useEffect(() => {arrHook()},[childData,selectCate]);


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
            onChangeCategorie = {(data) => {setSelectCate(data)}}
            idPack={idPack}
            />)
    }
        <Grid>
    </Grid>
        <Divider />
        </Grid>
        </Box>
 </>
}

export default GenBqRetirve
