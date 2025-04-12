
import React, { useEffect, useState } from 'react'
import helpers from './helpers';
import {  Box, Button, Card, Divider, TextField , Grid, useTheme,Dialog,DialogContent, DialogTitle,
    CircularProgress, IconButton
  } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";
import Top from '../../../icons/Top';
import Bottom from '../../../icons/Bottom';
import MaxTop from '../../../icons/MaxTop';
import MaxBottom from '../../../icons/MaxBottom';
import { isDark } from "@/utils/constants";
import {Paragraph } from "@/components/typography";
import { IconWrapper } from '@/components/icon-wrapper';
import Flag from '@/icons/Flag';
import { H6 } from '@/components/typography';
import { CheckBox, Margin, Search } from '@mui/icons-material';
import axios from 'axios';
import { ModeSelectors } from '@/___GlobalState__/Selectors/ModeSelectors';
import { useSelector } from 'react-redux';

import { FlexBox } from '@/components/flexbox';


import SelectAllIcon from '../../../icons/Select_All.svg';
import UNselectAllIcon from '../../../icons/unCheck.svg';
import { set } from 'nprogress';
// import iconLive from '../../../icons/livesvg.svg';
// import iconSeries from '../../icons/serie.svg';
// import iconMovies from '../../icons/moviesSvg.svg';
// import iconMoviesWhite from '../../icons/moviesWhite.svg';
// import FlexAround from '../flexbox/FlexAround';
// import { FlexSelect } from '@/components/flexbox';

const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const VITE_LEADER= import.meta.env.VITE_LEADER_URL;


import ModalContent from './ModalContent';

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
    
        onChangeIdMovie,
     })
{
    const Mode = useSelector(ModeSelectors);
const theme = useTheme();
const isDarkMode = theme.palette.mode === 'dark';
    const [search , setSearch] = useState('');
    const [searchAd , setSearchAd] = useState('');
    const [searchMove ,setSearchMove] = useState('');
    const [searchSerie , setSearchSerie] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [selectedSectionSerie, setSelectedSectionSerie] = useState('serie');
    const [selectedIds , setSelectedIds] = useState([]);
    const [onChangeIdLive , setOnChangeIdLive] = useState([]);
    const [address, setAddress] = useState([]);
    const [onChangeIdSerie , setOnChangeIdSerie] = useState([]);
    const [openModal, setOpenModal] = useState(false); // Modal state


    

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

   const __getLastId = async () => {
    const filteMAp = searchData?.filter((item) =>
      onChangeIdLive.includes(item.id)
    );
    
    const mapping = filteMAp?.filter((item) => item.Next === "Find").map((item) => item.Id);
    
    const allResults = [];
    let index = 0;
    
    // Process each mapping item one by one until all are done
    while (index < mapping.length) {
      try {
        const response = await axios.get(`${ADMIN_ROUTE}/getAddressCanadaPost?lastId=${mapping[index]}`);
        const resultItem = response.data;
        console.log(resultItem);
        
        // Accumulate results in the 1D array
        allResults.push(...resultItem.Items); // Merging items into one 1D array
    
        // Increment index after a successful response
        index++;
      } catch (error) {
        console.error("Error fetching item:", mapping[index], error);
        // Still increment index even on failure to ensure the loop moves on
        index++;
      }
    }
  
    // Once all results are fetched, update the state with the accumulated results
    
    // Log the results to verify everything was added correctly
    const filterAdr = allResults.map((item, index) => ({
        ...item,
        id: index + 1,   
    }));
    setAddress(filterAdr);
  };
  
  
   useEffect(() => {
    __getLastId();
   }, [onChangeIdLive]);
   useEffect(() => {
    __getSearch();
   }, [search]);

    const handleChangeSearchMovie = (e) =>{
        setSearchMove(e.target.value)
    }

    const handleChangeSearchAdress = (e) =>{
        setSearch(e.target.value)
    }
    const handleChangeSearchPorts = (e) =>{
        setSearchAd(e.target.value)
    }

    const bouquetAdress  = searchData?.filter (item =>

        item?.Text?.toLowerCase().includes(search?.toLocaleLowerCase())
    )
    const bouquetPorts = address?.filter (item =>

        item?.Text?.toLowerCase().includes(searchAd?.toLocaleLowerCase())
    )

  
const BandDark = (arr) =>  {
        return {   
            padding :"10px 37px" ,   
            backgroundColor: arr?.length ? "rgb(63 59 89)" :"#404651" , 
            borderRadius: '8px'
        }
}
const BandLight = (arr) => {
    return {
        padding :"10px 37px" ,   
        backgroundColor: arr?.length ? "rgb(63 59 89)" :"#c3c3c3" , 
        borderRadius: '8px'
    }
}
const StyleDark = (bq,arr) => {
   return {
    cursor: 'pointer',
    padding: '12px 18px',
    margin: '6px',
    backgroundColor:arr.includes(bq.id) ? "rgb(63 59 89)" : "#404651",
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
    backgroundColor:arr.includes(bq.id) ? "rgb(63 59 89)" : "#c3c3c3",
    borderRadius: '13px',
    color :"black",
    transition: 'background-color 0.3s ease'
    }
}


  // Function to open modal
  const handleOpenModal = () => setOpenModal(true);

  // Function to close modal
  const handleCloseModal = () => setOpenModal(false);

    return  <>
    <Card sx={{ mt: 3, padding: 3 }}>
          <FlexBox gap={0.5} alignItems="center">
            <IconWrapper>
              <Flag sx={{ color: "primary.main" }} />
            </IconWrapper>
            <H6 fontSize={16}>Adresse de mappage pour l'utilisateur</H6>
          </FlexBox>
          <Divider sx={{ my: 3 }} />
    <Box sx={{ backgroundColor: '', padding :"5px 10px" ,textAlign:"center", }}>

        <Grid container spacing={4} alignItems="center">
    <Grid item sm={12} md={6} xs={12}>

    <Box sx={{ backgroundColor: '', padding :"5px 10px" ,textAlign:"center", }}>
        <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={12} md={8}>
        <TextField sx={{my : 1, color: 'rgb(63 59 89)' , fontSize :"25px"}} fullWidth  placeholder="search your address . . . ."
        InputProps={{ startAdornment: <Search/>}} value={search} onChange={handleChangeSearchAdress} />
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
            {bouquetAdress.length > 0 ? bouquetAdress.map((bq) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={isDarkMode ? StyleDark (bq,onChangeIdLive): StyleLight(bq,onChangeIdLive)}
                >
                    {bq.Text.toUpperCase()}
                </option>)):<option style={{ color :"rgb(63 59 89)" ,fontWeight : "bolde" ,
          fontSize : "30px",
          margin : "130px 140px"}}>  </option>}
       
        </select>
        <Box sx={isDarkMode ? BandDark(onChangeIdLive):BandLight(onChangeIdLive)}>
             <Paragraph fontWeight={900}>Element Selected : {onChangeIdLive?.length}</Paragraph>
        </Box>
        <Box sx={{ backgroundColor: '', padding :"10px 5px"  }}>
       
            <Grid container spacing={2} >
            
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined"  onClick={() => helpers.actionBq.sortTop(searchData, onChangeIdLive, setSearchData)}><Top/></Button>
            </Grid>
            <Grid item sm={6}  md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined"  onClick={()=>{helpers.actionBq.sortMaxTop(searchData, onChangeIdLive, setSearchData)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={6}  md={3}  xs={6}>
                <Button fullWidth color="inherit" variant="outlined"  onClick={() => helpers.actionBq.sortBottom(searchData, onChangeIdLive, setSearchData)}><Bottom/></Button>
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
     <TextField sx={{my : 1}} fullWidth placeholder="ports ...." InputProps={{ startAdornment: <Search/>}}
     value={searchAd} onChange={handleChangeSearchPorts} />
     </Grid>
     <Grid item sm={6} xs={6} md={2}>                <Button fullWidth color="success"  variant="text"   
                onClick={() =>helpers.actionBq.handleSelectAll(onChangeIdSerie , address , setOnChangeIdSerie)}>                     
                <img src={SelectAllIcon} alt="icon" width="35" height="35" />
                </Button>
        </Grid>
        <Grid item sm={6} xs={6} md={2}>
                <Button fullWidth color='error' variant='text'
                 onClick={() => helpers.actionBq.handleUnselectAll(setOnChangeIdSerie)}>
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
            value={onChangeIdSerie}
            onChange={(e) => {
                const value = Array.from(e.target.selectedOptions, option => option.value);
                setOnChangeIdSerie(value.map(Number));
            }}
        >
            {bouquetPorts?.length > 0 ? bouquetPorts.map((bq, index) => (
                <option
                    key={bq.id}
                    value={bq.id}
                    style={isDarkMode ? StyleDark (bq,onChangeIdSerie): StyleLight (bq,onChangeIdSerie)}
                >
                    {bq?.Text}
                </option>
          )):<option style={{ color :"rgb(63 59 89)" ,fontWeight : "bolde" ,
          fontSize : "25px",
          margin : "130px 40px"}}> il n'y a aucun port à afficher</option>}
        </select>
        <Box sx={isDarkMode ? BandDark(onChangeIdSerie):BandLight(onChangeIdSerie)}>
             <Paragraph fontWeight={900}>Element Selected : {onChangeIdSerie?.length}</Paragraph>
        </Box>
        <Box sx={{ padding :"10px 5px"}}>

        <Grid container spacing={2} >
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined"  onClick={() => helpers.actionBq.sortTop(address,onChangeIdSerie ,  setAddress)}><Top/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="primary" variant="outlined"  onClick={()=>{helpers.actionBq.sortMaxTop(address,onChangeIdSerie ,  setAddress)}}><MaxTop/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="inherit"variant="outlined"  onClick={() => helpers.actionBq.sortBottom(address,onChangeIdSerie ,  setAddress)}><Bottom/></Button>
            </Grid>
            <Grid item sm={6} md={3}  xs={6}>
                <Button fullWidth color="inherit" variant="outlined" onClick={() => helpers.actionBq.sortMaxBottom(address,onChangeIdSerie ,  setAddress)}><MaxBottom/></Button>
            </Grid>
            </Grid>
        </Box>

    </Grid>
    </Grid>
    <Divider  sx={{ my: 3 }} />
    <Button variant="outlined"  onClick={handleOpenModal}> <Flag/> </Button>
    <ModalContent open={openModal} onClose={handleCloseModal} title={bouquetAdress} titleId={onChangeIdLive} map={address}  port={onChangeIdSerie} />
   </Box>
</Card>
</>
}


export default Maping ;
