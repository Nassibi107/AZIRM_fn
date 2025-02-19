
import React, { useEffect, useState } from 'react'
import helpers from './helpers';
import {  Box, Button, Card, Divider, TextField , Grid, Switch, Radio , List, ListItem, Paper, CircularProgress } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";
import Top from '../../../icons/Top';
import Bottom from '../../../icons/Bottom';
import MaxTop from '../../../icons/MaxTop';
import MaxBottom from '../../../icons/MaxBottom';

import { Margin, Search } from '@mui/icons-material';
import axios from 'axios';


 function  OnlyBouquet (
    {
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
        isDarkMode
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
    <Grid item sm={6}  xs={12}>
        <b>Bouquets Live: </b>
    <TextField sx={{my : 1}} fullWidth placeholder="Search..."
    InputProps={{ startAdornment: <Search/>}} value={search} onChange={handleChangeSearchLive} />

        <select
          style={{
                    height: '300px',
                    overflowY: "auto",
                    padding: '0.5rem 1rem',
                    borderRadius: "1%",
                    margin: '0.5rem auto',
                    border: '3px solid #ccc',
                    backgroundColor :isDarkMode ?  "#111827" : "white" ,
                    width: '100%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontStyle: 'inherit',
                    fontWeight: "bolder",
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
            {bouquetLiveFilter.map((bq) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '2px',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {bq.bouquet_name.split('bq.')}
                </option>
          ))}
        </select>
        <FlexBetween spacing={3}>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionLive , bouquetLiveApi , onChangeIdLive)}>Select All</Button>
            </Grid>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(onChangeIdLive)}>Unselect All</Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(bouquetLiveApi, selectedIds, setbouquetLiveApi)}><Top/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(bouquetLiveApi, selectedIds, setbouquetLiveApi)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(bouquetLiveApi, selectedIds, setbouquetLiveApi)}><Bottom/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(bouquetLiveApi, selectedIds, setbouquetLiveApi)}><MaxBottom/></Button>
            </Grid>
        </FlexBetween>
    </Grid>
    <Grid item sm={6}  xs={12}>
    <b>Bouquets Series: </b>
    <TextField sx={{my : 1}} fullWidth placeholder="Search..." InputProps={{ startAdornment: <Search/>}}
     value={searchSerie} onChange={handleChangeSearchSerie} />
        <select
          style={{
                    height: '300px',
                    overflowY: "auto",
                    padding: '0.5rem 1rem',
                    borderRadius: "1%",
                    margin: '0.5rem auto',
                    border: '3px solid #ccc',
                    backgroundColor :isDarkMode ?  "#111827" : "white" ,
                    width: '100%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontStyle: 'inherit',
                    fontWeight: "bolder",
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
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '2px',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {bq.bouquet_name.split('bq.')}
                </option>
          )):<option style={{ color :"#6950e8" ,fontWeight : "bolde" ,
          fontSize : "30px",
          margin : "130px 140px"}}> Loading ... </option>}
        </select>
        <FlexBetween spacing={3}>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionSerie , bouquetSerieApi , onChangeIdSerie)}>Select All</Button>
            </Grid>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(onChangeIdSerie)}>Unselect All</Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}><Top/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}><Bottom/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(bouquetSerieApi, selectedSerieIds, setbouquetSerieApi)}><MaxBottom/></Button>
            </Grid>
        </FlexBetween>
    </Grid>
    <Grid item sm={6}  xs={12}>
    <b>Bouquets Movies: </b>
    <TextField sx={{my : 1}} fullWidth placeholder="Search..." InputProps={{ startAdornment: <Search/>}}
     value={searchMove} onChange={handleChangeSearchMovie}  />
        <select
          style={{
                    height: '300px',
                    overflowY: "auto",
                    padding: '0.5rem 1rem',
                    borderRadius: "1%",
                    margin: '0.5rem auto',
                    border: '3px solid #ccc',
                    backgroundColor :isDarkMode ?  "#111827" : "white" ,
                    width: '100%',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontStyle: 'inherit',
                    fontWeight: "bolder",
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
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        margin: '2px',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {bq.bouquet_name.split('bq.')}
                </option>
          )):<option>not found item !</option>}
        </select>
        <FlexBetween spacing={3}>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionMove , bouquetLiveApi , setSelectedMovieIds)}>Select All</Button>
            </Grid>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(onChangeIdLive)}>Unselect All</Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}><Top/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}><Bottom/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(bouquetMovieApi, selectedMovieIds, setbouquetMovieApi)}><MaxBottom/></Button>
            </Grid>
        </FlexBetween>
    </Grid>

</>
}

export default OnlyBouquet ;
