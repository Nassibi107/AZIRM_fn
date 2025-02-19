import React, { useEffect, useState } from 'react'
import helpers from './helpers';
import {  Box, Button, Card, Divider, TextField , Grid, Switch, Radio , List, ListItem, Paper, CircularProgress } from '@mui/material';
import { FlexBetween } from "@/components/flexbox";
import Top from '../../icons/Top';
import Bottom from '../../icons/Bottom';
import MaxTop from '../../icons/MaxTop';
import MaxBottom from '../../icons/MaxBottom';
import { isDark } from "@/utils/constants";
import {Paragraph } from "@/components/typography";
import Policy from './Policy';
import { Margin, Search } from '@mui/icons-material';
import axios from 'axios';
const API_URLS = import.meta.env.VITE_LV_URL;
function GenBq({policy,name ,credit ,
     periodType ,period , isTrial , maxConnection})
 {

    const [global, setGlobal] = useState(false);

    const [policyData , setPolicyData] = useState([]);


    const [s , setS] = useState()
    const [selectedIds, setSelectedIds] = useState([]);
    const [isLoading, setisLoading] = useState([]);
    const [selectedSerieIds, setSelectedSerieIds] = useState([]);
    const [selectedLiveChild, setSelectedLiveChild] = useState([]);
    const [selectedSerieChild, setSelectedSerieChild] = useState([]);
    const [selectedMovieIds, setSelectedMovieIds] = useState([]);
    const [search , setSearch] = useState('');
    const [searchSerie , setSearchSerie] = useState('');
    const [searchChildLive , setSearchChildLive] = useState('');
    const [searchMove ,setSearchMove] = useState('');
    const [selectedSectionLive, setSelectedSectionLive] = useState('live');
    const [selectedSectionLiveChild, setSelectedSectionLiveChild] = useState([]);
    const [SectionLiveChild, setSectionLiveChild] = useState([]);
    const [SectionSerieChild, setSectionSerieChild] = useState([]);
    const [selectedSectionSerie, setSelectedSectionSerie] = useState('serie');
    const [selectedSectionMove, setSelectedSectionMovie] = useState('Movie');
    const [bouquetLiveApi, setbouquetLiveApi] = useState([]);
    const [bouquetLiveApiChild, setbouquetLiveApiChild] = useState([]);
    const [bouquetSerieApi, setbouquetSerieApi] = useState([]);
    const [bouquetMovieApi, setbouquetMovieApi] = useState([]);
    const [ttype, setTtype] = useState("");
    const getChild = async () => {
        try {
            let data = [];

                console.log(data);
                if (ttype == "live")
                {
                    if (selectedIds.length > 0) {
                    const resBqLive = await Promise.all(selectedIds.map(async (pid) => {
                        const response = await axios.get(`${API_URLS}/bouquets?filters[parent_id]=${pid}`);
                        return response.data.data;
                    }));
                    data = resBqLive.flat();
                    setSectionLiveChild(data);}else {setSectionLiveChild([])}
                }
                else if(ttype == "serie")
                {
                    if (selectedSerieIds.length > 0) {
                    const resBqLive = await Promise.all(selectedSerieIds.map(async (pid) => {
                        const response = await axios.get(`${API_URLS}/bouquets?filters[parent_id]=${pid}`);
                        return response.data.data;
                    }));
                    data = resBqLive.flat();
                    console.log(data);
                    setSectionSerieChild(data)
                    ;}else {setSectionSerieChild([])}
                }
            }catch (error) {
            console.error('Error fetching child bouquets:', error);
        }
    };


    useEffect (()=> {getChild()} , [selectedIds,selectedSerieIds]);

    const getBouquetsApi = async () => {
        try
        {
            const  resBqLive =  await axios.get(`${API_URLS}/bouquets?filters[type]=live`) ;
            const  resBqSeries =  await axios.get(`${API_URLS}/bouquets?filters[type]=serie`) ;
            const  resBqMovie =  await axios.get(`${API_URLS}/bouquets?filters[type]=movie`) ;
            setbouquetLiveApi(resBqLive.data.data);
            setbouquetSerieApi(resBqSeries.data.data);
            setbouquetMovieApi(resBqMovie.data.data);
        }catch(error)
        {
            console.log(error);
        }

    }

    useEffect(() => {getBouquetsApi()},[]);


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

    const [refundPolicy , setRefundPolicy] = useState([])
    const [values, setValues] = useState({});
    const handleToggleRefundPolicy = () => {
        const newId = refundPolicy.length;
        setRefundPolicy([...refundPolicy, { id: newId }]);
        setValues({...values , [newId] : { passedDays: '', refundAmount: '' }});
    };
    const handleRemoveRefundPolicy = (id) => {
        setRefundPolicy(refundPolicy.filter(item => item.id !== id));
        const { [id]: _, ...newValues } = values;
        setValues(newValues);
    };
    const handleInputChange = (id, name, value) => {
        setValues({ ...values, [id]: { ...values[id], [name]: value}})
    };


    const handleChangeSearchLive = (e) =>{
        setSearch(e.target.value)
    }
    const handleChangeSearchSerie = (e) =>{
        setSearchSerie(e.target.value)
    }
    const handleChangeSearchMovie = (e) =>{
        setSearchMove(e.target.value)
    }
    const handleChangeSearchChildLive = (e) =>{
        setSearchChildLive(e.target.value)
    }
    const onSave = async () => {
        try
        {
            const passedDays = ["0",...policyData.map(item => item.passedDays)];
            const refundAmount = ["0",...policyData.map(item => item.refundAmount)];
            const BouquetsIDs = selectedIds.concat([...selectedSerieIds ,...selectedMovieIds]);
            const data = {
                name: name,
                is_trial: isTrial,
                is_paid_trial: 0,
                credit: credit,
                period: parseInt(period),
                period_type: periodType,
                max_connections: parseInt(maxConnection),
                bouquets: [...BouquetsIDs],
                refund_policies: passedDays.map((passed_day, index) => ({
                    passed_days: passed_day,
                    refund_amount: refundAmount[index]
                }))
            };
            console.log(data);
            const rep = await axios.post(`${API_URLS}/packages`, data , {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              console.log(rep);
        }
         catch(error)
        {
            console.log(error);
        }
        // setS(pre => pre +1 );
        console.log(policyData.map(item => [item.passedDays, item.refundAmount]));
    }
    const getBouquetsForSection = () => {
        return bouquetLiveApi.filter(item => item.bouquet_name.toLowerCase().includes(searchBouquet.toLowerCase()));
    };
    const bouquetLiveFilter  = bouquetLiveApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(search?.toLocaleLowerCase())
    )
    const bouquetSerieFilter  = bouquetSerieApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(searchSerie?.toLocaleLowerCase())
    )
    const bouquetMovieFilter  = bouquetMovieApi.filter (item =>

        item.bouquet_name.toLowerCase().includes(searchMove?.toLocaleLowerCase())
    )
    const tmpFilter  = SectionLiveChild.filter (item =>

        item.bouquet_name?.toLowerCase().includes(searchChildLive?.toLocaleLowerCase())
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
        bouquetCategory && (<>
            <Grid item sm={12} md={6} xs={12}>
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
                        setSelectedIds(value.map(Number));
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
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionLive , bouquetLiveApi , setSelectedIds ,1)}>Select All</Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedIds)}>Unselect All</Button>
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
                        setSelectedSerieIds(value.map(Number));
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
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionSerie , bouquetSerieApi , setSelectedSerieIds)}>Select All</Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedSerieIds)}>Unselect All</Button>
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
            <Grid item sm={12} md={6} xs={12}>
            <b>Bouquets Series : </b>
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
                    value={selectedSerieChild}
                    onChange={(e) => {
                        const value = Array.from(e.target.selectedOptions, option => option.value);
                        setSelectedSerieChild(value.map(Number));

                    }}
                >

                    {SectionSerieChild.length > 0? SectionSerieChild.map((bq) => (
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
                        setSelectedIds(value.map(Number));
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
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedIds)}>Unselect All</Button>
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
                        setSelectedIds(value.map(Number));
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
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedIds)}>Unselect All</Button>
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
        </>)

    }
    {
        onlyBouquet && (<>
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
                        setSelectedIds(value.map(Number));
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
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionLive , bouquetLiveApi , setSelectedIds)}>Select All</Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedIds)}>Unselect All</Button>
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
                        setSelectedSerieIds(value.map(Number));
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
                        <Button fullWidth color="success" onClick={() =>helpers.actionBq.handleSelectAll(selectedSectionSerie , bouquetSerieApi , setSelectedSerieIds)}>Select All</Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedSerieIds)}>Unselect All</Button>
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
                        setSelectedIds(value.map(Number));
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
                        <Button fullWidth color="error" onClick={() => helpers.actionBq.handleUnselectAll(setSelectedIds)}>Unselect All</Button>
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
        </>)
    }
    {
        onlyCat && (
            <Grid item sm={12} xs={12} >
                <Paper style={{ maxHeight: '25rem',overflowY :"auto", padding: '0.5rem 1rem', borderRadius: 5, marginTop: '0.5rem' }}>
                    <List>
                        {getBouquetsForSection().map((bq) => (
                            <ListItem
                                onClick={() => helpers.effectBq.toggleSelection(bq.id)}
                                key={bq.id}
                                style={{ cursor: 'pointer', padding: '10px', margin: 2 , borderRadius: 5, border: theme => isDark(theme) ? "2px solid grey.700" : "2px solid grey.100" , background : selectedIds.includes(bq.id) ? "grey.700"  :"" }}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: theme => isDark(theme) ? "grey.700" : "grey.100"
                                    },
                                }}
                            >
                                {bq.reg}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        )
    }
        <Grid>
    </Grid>

        {
            policy && (<Grid container marginTop={5}>
                <Grid item sm={1} xs={1}></Grid>
                <Grid item sm={10} xs={10}>
                    <Divider >Refund Policy </Divider>
                    <Policy onGetPolicy = {(v) => setPolicyData(v) } />
                    <Divider />
                </Grid>
                <Grid item sm={1} xs={1}></Grid>
                </Grid>)

            }
        <Divider />
        </Grid>
        </Box>
              <Grid item sm={12} xs={12}>
                <Button variant="contained" onClick={onSave}>save</Button>
                </Grid>

 </>
}

export default GenBq
