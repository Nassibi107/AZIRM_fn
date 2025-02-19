
import React, { useEffect, useState } from 'react'
import helpers from './helpers';
import {  Box, Button, Card, Divider, TextField , Grid, Switch, Radio , List, ListItem, Paper, CircularProgress } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";
import Top from '../../../icons/Top';
import Bottom from '../../../icons/Bottom';
import MaxTop from '../../../icons/MaxTop';
import MaxBottom from '../../../icons/MaxBottom';

import SelectAllIcon from '@/icons/Select_All.svg';
import UNselectAllIcon from '@/icons/unCheck.svg';

import { Margin, Search } from '@mui/icons-material';
import axios from 'axios';
import { Paragraph } from '@/components/typography';
const BandDark = (arr) =>  {
    return {   
        padding :"10px 37px" ,   
        backgroundColor: arr.length ? "rgb(198 120 52)" :"#404651" , 
        borderRadius: '8px'
    }
}
const BandLight = (arr) => {
return {
    padding :"10px 37px" ,   
    backgroundColor: arr.length ? "rgb(198 120 52)" :"#c3c3c3" , 
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


 function  OnlyBouquet (
    {
        isDarkMode,
        bouquetSerieApi,
        bouquetLiveApi,
        bouquetMovieApi ,
        setbouquetLiveApi,
        setbouquetMovieApi,
        setbouquetSerieApi,
        selectedIds,
        selectedMovieIds,
        selectedSerieIds,
        onChangeIdLive,
        onChangeIdSerie,
        onChangeIdMovie,
     })
{
    const [search , setSearch] = useState('');
    const [searchMove ,setSearchMove] = useState('');
    const [searchSerie , setSearchSerie] = useState('');
    const [selectedSectionLive, setSelectedSectionLive] = useState('live');
    const [selectedSectionSerie, setSelectedSectionSerie] = useState('serie');

    const handleChangeSearchMovie = (e) =>{
        setSearchMove(e.target.value)
    }

    const handleChangeSearchLive = (e) =>{
        setSearch(e.target.value)
    }
    const handleChangeSearchSerie = (e) =>{
        setSearchSerie(e.target.value)
    }

    const bouquetSerieFilter  = bouquetSerieApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(searchSerie?.toLocaleLowerCase())
    )

    const bouquetMovieFilter  = bouquetMovieApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(searchMove?.toLocaleLowerCase())
    )
    const bouquetLiveFilter  = bouquetLiveApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(search?.toLocaleLowerCase())
    )
    return  <>
    <Grid item sm={12} md={6} xs={12}>

    <Box sx={{ backgroundColor: '', padding :"5px 10px" ,textAlign:"center", }}>
        <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={12} md={8}>
        <TextField sx={{my : 1, color: 'rgb(198 120 52)' , fontSize :"25px"}} fullWidth  placeholder="Bouquets Live..."
        InputProps={{ startAdornment: <Search/>}} value={search} onChange={handleChangeSearchLive} />
        </Grid>
      <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color="success"  variant="text" 
                onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionLive , bouquetLiveApi , onChangeIdLive)}>
                     <img src={SelectAllIcon} alt="icon" width="35" height="35" />
                </Button>
            </Grid>
            <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color='error' variant='text' 
                onClick={() => helpers.actionBq.handleUnselectAll(onChangeIdLive)}>
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
            value={selectedIds}
            onChange={(e) => {
                const value = Array.from(e.target.selectedOptions, option => option.value);
                onChangeIdLive(value.map(Number));
            }}
        >
            {bouquetLiveFilter.length ? bouquetLiveFilter.map((bq) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={isDarkMode ? StyleDark (bq,selectedIds): StyleLight(bq,selectedIds)}
                >
                    {bq.bouquet_name.split('bq.')[1].toUpperCase()}
                </option>)):<option style={{ color :"rgb(198 120 52)" ,fontWeight : "bolde" ,
          fontSize : "30px",
          margin : "130px 140px"}}> Loading ... </option>}
       
        </select>
        <Box sx={isDarkMode ? BandDark(selectedIds):BandLight(selectedIds)}>
             <Paragraph fontWeight={900}>Element Selected : {selectedIds.length}</Paragraph>
        </Box>
        <Box sx={{ backgroundColor: '', padding :"10px 5px"  }}>
       
            <Grid container spacing={2} >
            
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined" onClick={() => helpers.actionBq.sortTop(bouquetLiveApi, selectedIds, setbouquetLiveApi)}><Top/></Button>
            </Grid>
            <Grid item sm={6}  md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined" onClick={()=>{helpers.actionBq.sortMaxTop(bouquetLiveApi, selectedIds, setbouquetLiveApi)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={6}  md={3}  xs={6}>
                <Button fullWidth color="inherit" variant="outlined" onClick={() => helpers.actionBq.sortBottom(bouquetLiveApi, selectedIds, setbouquetLiveApi)}><Bottom/></Button>
            </Grid>
            <Grid item sm={6}  md={3} xs={6}>
                <Button fullWidth 
                color="inherit" 
                variant="outlined" onClick={() => helpers.actionBq.sortMaxBottom(bouquetLiveApi, selectedIds, setbouquetLiveApi)}><MaxBottom/></Button>
            </Grid>
            </Grid>
            
        </Box>
    </Grid>
    <Grid item sm={12} md={6} xs={12}>
    <Box sx={{ padding :"5px 10px" ,
    textAlign:"center"}}>
         <Grid container spacing={1} alignItems="center">
         <Grid item xs={12} sm={12} md={8}>
     <TextField sx={{my : 1}} fullWidth placeholder="Bouquets Series..." InputProps={{ startAdornment: <Search/>}}
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
            {bouquetSerieFilter.length > 0 ? bouquetSerieFilter.map((bq) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={isDarkMode ? StyleDark (bq,selectedSerieIds): StyleLight (bq,selectedSerieIds)}
                >
                    {bq.bouquet_name.split('bq.')[1].toUpperCase()}
                </option>
          )):<option style={{ color :"rgb(198 120 52)" ,fontWeight : "bolde" ,
          fontSize : "30px",
          margin : "130px 140px"}}> Loading ... </option>}
        </select>
        <Box sx={isDarkMode ? BandDark(selectedSerieIds):BandLight(selectedSerieIds)}>
             <Paragraph fontWeight={900}>Element Selected : {selectedSerieIds.length}</Paragraph>
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
    <Grid item sm={12} md={6} xs={12}>


    <Box sx={ {padding :"5px 10px" ,textAlign:"center"}}>
        <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={12} md={8}>
        <TextField sx={{my : 1}} fullWidth placeholder="Bouquets Movies. . ." InputProps={{ startAdornment: <Search/>}}
        value={searchMove} onChange={handleChangeSearchMovie}  />
        </Grid>
        <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color="success" variant="text"
                onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionMove , bouquetLiveApi , setSelectedMovieIds)}>
                                         <img src={SelectAllIcon} alt="icon" width="35" height="35" />
                        </Button>
            </Grid>
            <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color="error" variant="text"
                onClick={() => helpers.actionBq.handleUnselectAll(onChangeIdLive)}>
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
            value={selectedIds}
            onChange={(e) => {
                const value = Array.from(e.target.selectedOptions, option => option.value);
                onChangeIdLive(value.map(Number));
            }}
        >
            {bouquetMovieFilter.length > 0? bouquetMovieFilter.map((bq) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={isDarkMode ? StyleDark (bq,selectedMovieIds): StyleLight(bq,selectedMovieIds)}
                
                >
                    {bq.bouquet_name.split('bq.')}
                </option>
          )):<option>not found item !</option>}
        </select>
        <Box sx={{  padding :"10px 5px" }}>
        <Grid container spacing={2} >

            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined"  onClick={() => helpers.actionBq.sortTop(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}><Top/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined" onClick={()=>{helpers.actionBq.sortMaxTop(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="inherit" variant="outlined" onClick={() => helpers.actionBq.sortBottom(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}><Bottom/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="inherit" variant="outlined" onClick={() => helpers.actionBq.sortMaxBottom(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}><MaxBottom/></Button>
            </Grid>
            </Grid>
        </Box>
    </Grid>

</>
}

export default OnlyBouquet ;
