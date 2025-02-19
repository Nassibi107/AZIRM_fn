
import React, { useEffect, useState } from 'react'
import helpers from './helpers';
import {  Box, Button, Card, Divider, TextField , Grid, Switch, Radio , List, ListItem, Paper, CircularProgress } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";
import Top from '../../../icons/Top';
import Bottom from '../../../icons/Bottom';
import MaxTop from '../../../icons/MaxTop';
import MaxBottom from '../../../icons/MaxBottom';

import { ContactSupportOutlined, Margin, Search } from '@mui/icons-material';
import axios from 'axios';

const API_URLS = import.meta.env.VITE_LV_URL;
 function  OnlyCategorie (
    { 
        onChangeCategorie,
        idPack,
        id,
        isDarkMode
     }) 
{

    

    const [search , setSearch] = useState('');
    const [selectedMovieIds, setSelectedMovieIds] = useState([]);
    const [searchMove ,setSearchMove] = useState('');
    const [searchSerie , setSearchSerie] = useState('');
    const [selectedSerieIds, setSelectedSerieIds] = useState([]);
    const [selectedIds,  setSelectedIds] = useState([]);
    const [selectedSectionLive, setSelectedSectionLive] = useState('live');
    const [selectedSectionSerie, setSelectedSectionSerie] = useState('serie');
    const [childLive,setChildlive] = useState([]);
    const [childSerie,setChildSerie] = useState([]);
    const [childMovie,setChildMovie] = useState([]);
  
    const getBouquetsApi = async () => {
        try
        {
            const  resBqLive =  await axios.get(`${API_URLS}/template/${idPack}/bouquets?filters[is_children][type]=live`) ;
            const  resBqSeries =  await axios.get(`${API_URLS}/template/${idPack}/bouquets?filters[is_children][type]=serie`) ;
            const  resBqMovie =  await axios.get(`${API_URLS}/template/${idPack}/bouquets?filters[is_children][type]=movie`) ;
            const [LiveIds , SerieIds , MoviesIds ] = await Promise.all([
                axios.get(`${API_URLS}/template/${idPack}/bouquets?filters[is_children][type]=live`),
                axios.get(`${API_URLS}/template/${idPack}/bouquets?filters[is_children][type]=serie`),
                axios.get(`${API_URLS}/template/${idPack}/bouquets?filters[is_children][type]=movie`)
            ])
            setChildlive(resBqLive.data.data);
            setChildSerie(resBqSeries.data.data);
            setChildMovie(resBqMovie.data.data);
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
    useEffect (()=> { getBouquetsApi()},[]);
    useEffect(() =>{ 
        console.log(childSerie);
        let data = selectedIds.concat([...selectedSerieIds]);
        console.log(data);
        onChangeCategorie(data);

    },[selectedIds,selectedSerieIds])
    const handleChangeSearchMovie = (e) =>{
        setSearchMove(e.target.value)
    }
    
    const handleChangeSearchLive = (e) =>{
        setSearch(e.target.value)
    }
    const handleChangeSearchSerie = (e) =>{
        setSearchSerie(e.target.value)
    }
    
    const childSerieFilter  = childSerie.filter (item =>

        item.bouquet_name.toLowerCase().includes(searchSerie?.toLocaleLowerCase())
    )

    const childMovieFilter  = childMovie.filter (item =>

        item.bouquet_name.toLowerCase().includes(searchMove?.toLocaleLowerCase())
    )
    const childLiveFilter  = childLive.filter (item =>

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
                setSelectedIds(value.map(Number));
            }}
        >
            {childLiveFilter.map((bq) => (
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
                <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionLive , childLive , setSelectedIds)}>Select All</Button>
            </Grid>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedIds)}>Unselect All</Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(childLive, selectedIds, setChildlive)}><Top/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(childLive, selectedIds, setChildlive)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(childLive, selectedIds, setChildlive)}><Bottom/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(childLive, selectedIds, setChildlive)}><MaxBottom/></Button>
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
                setSelectedSerieIds(value.map(Number));
            }}
        >
            {childSerieFilter.length > 0 ? childSerieFilter.map((bq) => (
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
                <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionSerie , childSerie, setSelectedSerieIds)}>Select All</Button>
            </Grid>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedSerieIds)}>Unselect All</Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(childSerie, selectedSerieIds, setChildSerie)}><Top/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(childSerie, selectedSerieIds, setChildSerie)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(childSerie, selectedSerieIds, setChildSerie)}><Bottom/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(childSerie, selectedSerieIds, setChildSerie)}><MaxBottom/></Button>
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
                setSelectedIds(value.map(Number));
            }}
        >
            {childMovieFilter.length > 0? childMovieFilter.map((bq) => (
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
                <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionMove , childLive , setSelectedMovieIds)}>Select All</Button>
            </Grid>
            <Grid item sm={3} xs={12}>
                <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedIds)}>Unselect All</Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(childMovie, selectedMovieIds, setChildMovie)}><Top/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(childMovie, selectedMovieIds, setChildMovie)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(childMovie, selectedMovieIds, setChildMovie)}><Bottom/></Button>
            </Grid>
            <Grid item sm={1.5} xs={12}>
                <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(childMovie, selectedMovieIds, setChildMovie)}><MaxBottom/></Button>
            </Grid>
        </FlexBetween>
    </Grid>
</>
}

export default OnlyCategorie ;