
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
const API_URLS = import.meta.env.VITE_LV_URL;



function  BouquetCategory (
 { 
    bouquetSerieApi,
    bouquetLiveApi,
    bouquetMovieApi ,
    setbouquetLiveApi,
    setbouquetMovieApi,
    setbouquetSerieApi,
    onChangeChild,
    selectedSerieIds,
    selectedMovieIds,
    selectedIds,
    onChangeIdLive,
    onChangeIdSerie,
    onChangeIdMovie,
    idPack
 })
{

    //-----------------------------------------------
    // ----- Live Tools---------------
    const [searchChildLive , setSearchChildLive] = useState('');
    const [selectedLiveChild, setSelectedLiveChild] = useState([]);
    const [SectionLiveChild, setSectionLiveChild] = useState([]);
    //---------------------------------------------------------
    // ----- Live Serie---------------
    const [searchChildSerie , setSearchChildSerie] = useState('');
    const [selectedSerieChild, setSelectedSerieChild] = useState([]);
    const [SectionSerieChild, setSectionSerieChild] = useState([]);
    //---------------------------------------------------------
    // ----- tools---------------
    
    const [searchMove ,setSearchMove] = useState('');
    const [selectedSectionLive, setSelectedSectionLive] = useState('live');
    const [search , setSearch] = useState('');
    const [selectedSectionSerie, setSelectedSectionSerie] = useState('serie');
    const [searchSerie , setSearchSerie] = useState('');
    const [ttype , setTtype]= useState("first"); 
     //---------------------------------------------------------

    // ----- this Ttype variable for take decision  of who array i want !! ---------------
    // ---------------
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
    const getChild = async () => {
        try {
            let data = [];
            let resBqLive = []; 
            console.log(selectedIds);
            if (ttype === "live" || ttype == "first") {
                if (selectedIds.length > 0) {
                    resBqLive = await Promise.all(selectedIds.map(async (pid) => {
                        const response = await axios.get(`${API_URLS}/bouquets?filters[parent_id]=${pid}`);
                        return response.data.data;
                    }));
                } 
                data = resBqLive.flat();
                setSectionLiveChild(data);
                console.log(data);
            }
            
            if (ttype === "serie" || ttype == "first") {
                if (selectedSerieIds.length > 0) {
                    resBqLive = await Promise.all(selectedSerieIds.map(async (pid) => {
                        const response = await axios.get(`${API_URLS}/bouquets/?filters[parent_id]=${pid}`);
                        return response.data.data;
                    }));
                } 
                data = resBqLive.flat();
                setSectionSerieChild(data);
                console.log(data);
            }
        } catch (error) {
            console.error('Error fetching child bouquets:', error);
        }
    };
    const getChildSelected = async () => {
        try {
            let data = [];
            let resBqLive = []; 
            if (selectedIds.length > 0) {
                    resBqLive = await Promise.all(selectedIds.map(async (pid) => {
                        const response = await axios.get(`${API_URLS}/bouquets?filters[parent_id]=${pid}`);
                        return response.data.data;
                    }));
                } 
                data = resBqLive.flat();
                setSelectedLiveChild(data.map(item => item.id));
                if (selectedSerieIds.length > 0) {
                    resBqLive = await Promise.all(selectedSerieIds.map(async (pid) => {
                        const response = await axios.get(`${API_URLS}/bouquets/?filters[parent_id]=${pid}`);
                        return response.data.data;
                    }));
                } 
                data = resBqLive.flat();
                setSelectedSerieChild(data.map(item => item.id));
            
        } catch (error) {
            console.error('Error fetching child bouquets:', error);
        }
    };
    

    const bouquetLiveFilter  = bouquetLiveApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(search?.toLocaleLowerCase())
    )
    useEffect (()=> {getChild()} , [selectedIds,selectedSerieIds]) ;
    useEffect (()=> {getChildSelected()} , []) ;

    // search (filtrage)  get variable of textMui: 

    const handleChangeSearchChildLive = (e) =>{
        setSearchChildLive(e.target.value)
    }
   
    const handleChangeSearchChildSerie= (e) =>{
        setSearchChildSerie(e.target.value)
    }

    const tmpFilter  = SectionLiveChild.filter (item =>

        item.bouquet_name?.toLowerCase().includes(searchChildLive?.toLocaleLowerCase())
    )
    const tmpFilterSeries  = SectionSerieChild.filter (item =>

        item.bouquet_name?.toLowerCase().includes(searchChildSerie?.toLocaleLowerCase())
    )
    useEffect(() =>{ 

        let data =  selectedMovieIds.concat([...selectedLiveChild ,...selectedSerieChild]);
        console.log(data);
        onChangeChild(data);

    },[selectedSerieChild,selectedLiveChild])
    return <> 
     {/*live */}
      <Grid item sm={12} md={6} xs={12}>

                <b>Bouquets Live: </b>
            <TextField sx={{my : 1}} fullWidth placeholder="Search..."
            InputProps={{ startAdornment: <Search/>}}   value={search} onChange={handleChangeSearchLive} />
                <select
                    style={{
                        height: '300px',
                        overflowY: "auto",
                        padding: '0.5rem 1rem',
                        borderRadius: "1%",
                        margin: '0.5rem auto',
                        border: '3px solid #ccc',
                        backgroundColor : "#111827" ,
                        width: '100%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontStyle: 'inherit',
                        fontWeight: "bolder",
                        fontSize:"18px",
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    multiple
                    value={selectedIds}
                    onChange={(e) => {
                        const value = Array.from(e.target.selectedOptions, option => option.value);
                        onChangeIdLive(value.map(Number));
                        setTtype("live");
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
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionLive , bouquetLiveApi , onChangeIdLive ,1)}>Select All</Button>
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
              {/*child live */}
            <Grid item sm={12} md={6} xs={12}>
            <b>Bouquets Live: </b>
            <TextField sx={{my : 1}} fullWidth placeholder="Search..." InputProps={{ startAdornment: <Search/>}}
             value={searchChildLive} onChange={handleChangeSearchChildLive} />
                <select
                    style={{
                        height: '300px',
                        overflowY: "auto",
                        padding: '0.5rem 1rem',
                        borderRadius: "1%",
                        margin: '0.5rem auto',
                        border: '3px solid #ccc',
                        backgroundColor : "#111827" ,
                        width: '100%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontStyle: 'inherit',
                        fontWeight: "bolder",
                        fontSize:"18px",
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    multiple
                    value={selectedLiveChild}
                    onChange={(e) => {
                        const value = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedLiveChild(value.map(Number));
                    }}
                >
                    {(tmpFilter.length > 0) ? tmpFilter.map((bq) => (
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
                  margin : "115px 90px"}}></option>}
                </select>
                <FlexBetween spacing={3}>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedLiveChild , SectionLiveChild , setSelectedLiveChild)}>Select All</Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedLiveChild)}>Unselect All</Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(SectionLiveChild, selectedLiveChild, setSectionLiveChild)}><Top/></Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(SectionLiveChild, selectedLiveChild, setSectionLiveChild)}}><MaxTop/></Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(SectionLiveChild, selectedLiveChild, setSectionLiveChild)}><Bottom/></Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(SectionLiveChild, selectedLiveChild, setSectionLiveChild)}><MaxBottom/></Button>
                    </Grid>
                </FlexBetween>
            </Grid>
             {/*serie */}
            <Grid item sm={12} md={6} xs={12}>
            <b>Bouquets Series :</b>
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
                        backgroundColor : "#111827" ,
                        width: '100%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontStyle: 'inherit',
                        fontWeight: "bolder",
                        fontSize:"18px",
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    multiple
                    value={selectedSerieIds}
                    onChange={(e) => {
                        const value = Array.from(e.target.selectedOptions, option => option.value);
                        onChangeIdSerie(value.map(Number));
                        setTtype("serie");
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
             {/*child serie */}
            <Grid item sm={12} md={6} xs={12}> 
                
            <b>Bouquets Series : </b>
            <TextField sx={{my : 1}} fullWidth placeholder="Search..." InputProps={{ startAdornment: <Search/>}}
             value={searchChildSerie} onChange={handleChangeSearchChildSerie}  />
                <select
                    style={{
                        height: '300px',
                        overflowY: "auto",
                        padding: '0.5rem 1rem',
                        borderRadius: "1%",
                        margin: '0.5rem auto',
                        border: '3px solid #ccc',
                        backgroundColor : "#111827" ,
                        width: '100%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontStyle: 'inherit',
                        fontWeight: "bolder",
                        fontSize:"18px",
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    multiple
                    value={selectedSerieChild}
                    onChange={(e) => {
                        const value = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedSerieChild(value.map(Number));

                    }}
                >
                   {tmpFilterSeries.length > 0? tmpFilterSeries.map((bq) => (
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
                  )):<option></option>}
                </select>
                <FlexBetween spacing={3}>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSerieChild , SectionSerieChild , setSelectedSerieChild)}>Select All</Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedSerieChild)}>Unselect All</Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="primary" onClick={() => helpers.actionBq.sortTop(SectionSerieChild,selectedSerieChild , setSectionSerieChild)}><Top/></Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="primary" onClick={()=>{helpers.actionBq.sortMaxTop(SectionSerieChild,selectedSerieChild , setSectionSerieChild)}}><MaxTop/></Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortBottom(SectionSerieChild,selectedSerieChild , setSectionSerieChild)}><Bottom/></Button>
                    </Grid>
                    <Grid item sm={1.5} xs={12}>
                        <Button fullWidth color="inherit" onClick={() => helpers.actionBq.sortMaxBottom(SectionSerieChild,selectedSerieChild , setSectionSerieChild)}><MaxBottom/></Button>
                    </Grid>
                </FlexBetween>
            </Grid>
            <Grid item sm={12} md={6} xs={12}>
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
                        backgroundColor : "#111827" ,
                        width: '100%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontStyle: 'inherit',
                        fontWeight: "bolder",
                        fontSize:"18px",
                        color: 'white',
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
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionMove , bouquetLiveApi , onChangeIdMovie)}>Select All</Button>
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
            <Grid item sm={21} md={6} xs={12}>
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
                        backgroundColor : "#111827" ,
                        width: '100%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        fontStyle: 'inherit',
                        fontWeight: "bolder",
                        fontSize:"18px",
                        color: 'white',
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
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionMove , bouquetLiveApi , onChangeIdMovie)}>Select All</Button>
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


export default BouquetCategory;