
import React, { useEffect, useState } from 'react'
import helpers from './helpers';
import {  Box, Button, Card, Divider, TextField , Grid, useTheme,Switch, Radio , List, ListItem, Paper, CircularProgress, colors } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";
import Top from '../../../icons/Top';
import Bottom from '../../../icons/Bottom';
import MaxTop from '../../../icons/MaxTop';
import MaxBottom from '../../../icons/MaxBottom';
import { isDark } from "@/utils/constants";
import {Paragraph } from "@/components/typography";

import { CheckBox, Margin, Search } from '@mui/icons-material';
import axios from 'axios';
import { ModeSelectors } from '@/___GlobalState__/Selectors/ModeSelectors';
import { useSelector } from 'react-redux';



import SelectAllIcon from '../../../icons/Select_All.svg';
import UNselectAllIcon from '../../../icons/unCheck.svg';
// import iconLive from '../../../icons/livesvg.svg';
// import iconSeries from '../../icons/serie.svg';
// import iconMovies from '../../icons/moviesSvg.svg';
// import iconMoviesWhite from '../../icons/moviesWhite.svg';
// import FlexAround from '../flexbox/FlexAround';
// import { FlexSelect } from '@/components/flexbox';

const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const VITE_LEADER= import.meta.env.VITE_LEADER_URL;




 function  Maping (
    {
        bouquetSerieApi,
        bouquetLiveApi,
        bouquetMovieApi ,
        setbouquetLiveApi,
        setbouquetMovieApi,
        setbouquetSerieApi,
        selectedMovieIds,
        selectedSerieIds,
        onChangeIdSerie,
        onChangeIdMovie,
     })
{
    const Mode = useSelector(ModeSelectors);
const theme = useTheme();
const isDarkMode = theme.palette.mode === 'dark';
    const [search , setSearch] = useState('');
    const [searchMove ,setSearchMove] = useState('');
    const [searchSerie , setSearchSerie] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [selectedSectionSerie, setSelectedSectionSerie] = useState('serie');
    const [selectedIds , setSelectedIds] = useState([]);
    const [onChangeIdLive , setOnChangeIdLive] = useState([]);
    const [address, setAddress] = useState([]);
  const __getSearch = async () =>{
     try {
        const response = await axios.get(`${ADMIN_ROUTE}/getAddressCanadaPost?searchTerm=${search}`)
        const itemsWithIds = response.data.Items.map((item, index) => ({
            ...item,
            id: index + 1,   
        }));
        setSearchData(itemsWithIds);
        console.log(itemsWithIds);
     } catch (error) {
         console.error('Error fetching bouquetLiveApi:', error);
     }
   }

   const __getLastId = async () =>{
  
        
        const filteMAp = searchData?.filter((item) =>
            onChangeIdLive.includes(item.id)
        )
        const mapping  = filteMAp?.filter((item) => item.Next== "Find").map((item) => item.Id)
      const allResults = [];
        let index = 0;
        while (index < mapping.length) {
            try {
              const response = await axios.get(`${ADMIN_ROUTE}/getAddressCanadaPost?lastId=${mapping[index]}`);
              
              const resultItem = response.data; 
              allResults.push(resultItem); 
              const itemsWithIds = allResults.map((item, index) => ({
                ...item,
                id: index + 1,   
            }));
          
              index++; 
              console.log(itemsWithIds)
              setAddress(itemsWithIds);
              // move to next item
            } catch (error) {
              console.error("Error fetching item:", mapping[index], error);
              index++; // still move on even if one fails
            }
   }
}
   useEffect(() => {
    __getLastId();
   }, [onChangeIdLive]);
   useEffect(() => {
    __getSearch();
   }, [search]);

    const handleChangeSearchMovie = (e) =>{
        setSearchMove(e.target.value)
    }

    const handleChangeSearchLive = (e) =>{
        setSearch(e.target.value)
    }
    const handleChangeSearchSerie = (e) =>{
        setSearchSerie(e.target.value)
    }

    const bouquetLiveFilter  = searchData?.filter (item =>

        item?.Text?.toLowerCase().includes(search?.toLocaleLowerCase())
    )

  
const BandDark = (arr) =>  {
        return {   
            padding :"10px 37px" ,   
            backgroundColor: arr?.length ? "rgb(198 120 52)" :"#404651" , 
            borderRadius: '8px'
        }
}
const BandLight = (arr) => {
    return {
        padding :"10px 37px" ,   
        backgroundColor: arr?.length ? "rgb(198 120 52)" :"#c3c3c3" , 
        borderRadius: '8px'
    }
}
const StyleDark = (bq,arr) => {
   return {
    cursor: 'pointer',
    padding: '12px 18px',
    margin: '6px',
    backgroundColor:arr.includes(bq.id) ? "rgb(198 120 52)" : "#404651",
    borderRadius: '13px',
    color :"white",
    transition: 'background-color 0.3s ease'
   }
}
const StyleLight = (bq,arr) => {
    return {
    cursor: 'pointer',
    padding: '12px 18px',
    margin: '6px',
    backgroundColor:arr.includes(bq.id) ? "rgb(198 120 52)" : "#c3c3c3",
    borderRadius: '13px',
    color :"black",
    transition: 'background-color 0.3s ease'
    }
}

    return  <>
    <Box sx={{ backgroundColor: '', padding :"5px 10px" ,textAlign:"center", }}>

        <Grid container spacing={4} alignItems="center">
    <Grid item sm={12} md={6} xs={12}>

    <Box sx={{ backgroundColor: '', padding :"5px 10px" ,textAlign:"center", }}>
        <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={12} md={8}>
        <TextField sx={{my : 1, color: 'rgb(198 120 52)' , fontSize :"25px"}} fullWidth  placeholder="search your address . . . ."
        InputProps={{ startAdornment: <Search/>}} value={search} onChange={handleChangeSearchLive} />
        </Grid>
      <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color="success"  variant="text" 
                onClick={() =>helpers.actionBq.handleSelectAll(onChangeIdLive ,  searchData, setOnChangeIdLive)}>
                     <img src={SelectAllIcon} alt="icon" width="35" height="35" />
                </Button>
            </Grid>
            <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color='error' variant='text' 
                onClick={() => helpers.actionBq.handleUnselectAll(setOnChangeIdLive)}>
                     <img src={UNselectAllIcon} alt="icon" width="35" height="35" />
                </Button>
            </Grid> 
        </Grid>
    </Box>

        <select
              style={{
                        height: '335px',
                        overflowY: "auto",
                        padding: '20px 16px',
                        borderRadius: "1%",
                        margin: '0.1rem auto',
                        // border: '3px inset #6d28d9',
                        border : "0px",
                        backgroundColor :isDarkMode ?  "#1f2937" : "white" ,
                        width: '100%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontStyle: 'inherit',
                        fontSize:"18px",
                        // color: isDarkMode ?  "white" : "#111827" ,
                        cursor: 'pointer'

                    }}
            multiple
            value={onChangeIdLive}
            onChange={(e) => {
                const value = Array.from(e.target.selectedOptions, option => option.value);
                setOnChangeIdLive(value.map(Number));
            }}
        >
            {bouquetLiveFilter.length > 0 ? bouquetLiveFilter.map((bq) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={isDarkMode ? StyleDark (bq,onChangeIdLive): StyleLight(bq,onChangeIdLive)}
                >
                    {bq.Text.toUpperCase()}
                </option>)):<option style={{ color :"rgb(198 120 52)" ,fontWeight : "bolde" ,
          fontSize : "30px",
          margin : "130px 140px"}}> Loading ... </option>}
       
        </select>
        <Box sx={isDarkMode ? BandDark(onChangeIdLive):BandLight(onChangeIdLive)}>
             <Paragraph fontWeight={900}>Element Selected : {onChangeIdLive?.length}</Paragraph>
        </Box>
        <Box sx={{ backgroundColor: '', padding :"10px 5px"  }}>
       
            <Grid container spacing={2} >
            
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined" onClick={() => helpers.actionBq.sortTop(searchData, onChangeIdLive, setSearchData)}><Top/></Button>
            </Grid>
            <Grid item sm={6}  md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined" onClick={()=>{helpers.actionBq.sortMaxTop(searchData, onChangeIdLive, setSearchData)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={6}  md={3}  xs={6}>
                <Button fullWidth color="inherit" variant="outlined" onClick={() => helpers.actionBq.sortBottom(searchData, onChangeIdLive, setSearchData)}><Bottom/></Button>
            </Grid>
            <Grid item sm={6}  md={3} xs={6}>
                <Button fullWidth 
                color="inherit" 
                variant="outlined" onClick={() => helpers.actionBq.sortMaxBottom(searchData, onChangeIdLive, setSearchData)}><MaxBottom/></Button>
            </Grid>
            </Grid>
            
        </Box>
    </Grid>
    <Grid item sm={12} md={6} xs={12}>
    <Box sx={{ padding :"5px 10px" ,
    textAlign:"center"}}>
         <Grid container spacing={1} alignItems="center">
         <Grid item xs={12} sm={12} md={8}>
     <TextField sx={{my : 1}} fullWidth placeholder="address." InputProps={{ startAdornment: <Search/>}}
     value={searchSerie} onChange={handleChangeSearchSerie} />
     </Grid>
     <Grid item sm={6} xs={6} md={2}>                <Button fullWidth color="success"  variant="text"   
                onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionSerie , bouquetSerieApi , onChangeIdSerie)}>                     
                <img src={SelectAllIcon} alt="icon" width="35" height="35" />
                </Button>
        </Grid>
        <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color='error' variant='text'
                 onClick={() => helpers.actionBq.handleUnselectAll(onChangeIdSerie)}>
                    <img src={UNselectAllIcon} alt="icon" width="35" height="35" />
                 </Button>
        </Grid>
       
     </Grid>
    </Box>
   
        <select
          style={{
            height: '335px',
            overflowY: "auto",
            padding: '20px 16px',
            borderRadius: "1%",
            margin: '0.1rem auto',
            // border: '3px inset #6d28d9',
            border : "0px",
            backgroundColor :isDarkMode ?  "#1f2937" : "white" ,
            width: '100%',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontStyle: 'inherit',
            fontSize:"18px",
            color: isDarkMode ?  "white" : "#111827" ,
            cursor: 'pointer'

        }}
            multiple
            value={selectedSerieIds}
            onChange={(e) => {
                const value = Array.from(e.target.selectedOptions, option => option.value);
                onChangeIdSerie(value.map(Number));
            }}
        >
            {address?.length > 0 ? address.map((bq) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={isDarkMode ? StyleDark (bq,selectedSerieIds): StyleLight (bq,selectedSerieIds)}
                >
                    {bq.Text.toUpperCase()}
                </option>
          )):<option style={{ color :"rgb(198 120 52)" ,fontWeight : "bolde" ,
          fontSize : "30px",
          margin : "130px 140px"}}> Loading ... </option>}
        </select>
        <Box sx={isDarkMode ? BandDark(selectedSerieIds):BandLight(selectedSerieIds)}>
             <Paragraph fontWeight={900}>Element Selected : {selectedSerieIds?.length}</Paragraph>
        </Box>
        <Box sx={{ padding :"10px 5px"}}>

        <Grid container spacing={2} >
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined"  onClick={() => helpers.actionBq.sortTop(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}><Top/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined"  onClick={()=>{helpers.actionBq.sortMaxTop(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="inherit"variant="outlined" onClick={() => helpers.actionBq.sortBottom(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}><Bottom/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="inherit" variant="outlined" onClick={() => helpers.actionBq.sortMaxBottom(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}><MaxBottom/></Button>
            </Grid>
            </Grid>
        </Box>
    </Grid>
    </Grid>
   </Box>

</>
}

export default Maping ;
