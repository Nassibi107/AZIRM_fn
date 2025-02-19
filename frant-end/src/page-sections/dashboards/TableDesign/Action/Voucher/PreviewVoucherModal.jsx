import { Modal, Box, Grid, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import { isDark } from "@/utils/constants";

import Emergency from '@/icons/Emergency.jsx'
import Investment from '@/icons/Investment.jsx'
import TimelapseIcon from '@mui/icons-material/Timelapse';
import LayersIcon from '@mui/icons-material/Layers';
// 
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { OnlineBuzz, OfflineBuzz, BanBuzz, BlockBuzz, ActiveBuzz, InactiveBuzz } from "../../Buzzers/Buzzer";

const PreviewVoucherModal = ({ isPriview, handlePreview, dataRow }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));

    return(
    <>
        <Modal
            open={isPriview}
            onClose={handlePreview}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    maxHeight: 600,
                    overflowY: "auto",
                    width: { xs: "95%", sm: "85%", md: "55%" },
                    outline: "none",
                    borderRadius: "10px",
                    border: (theme) =>
                    `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"}`,
                    "&::-webkit-scrollbar": {
                    display: "none",
                    },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                <Grid container spacing={{ xs: 3, md: 3 }}>

                    <Grid item xs={12} sm={12} md={12} mb={{ md: 1.5, xs: 2 }}>
                        <Grid container spacing={1.5}>
                            <Grid
                            item
                            xs={8}
                            sm={6}
                            md={6}
                            fontSize={20}
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                width: 'fit-content',
                                height: 'fit-content',
                                marginRight: 'auto',
                            }}
                            >
                            <strong>Voucher Preview</strong>
                            </Grid>

                            <Grid
                            item
                            xs={4}
                            sm={6}
                            md={6}
                            fontSize={15}
                            sx={{
                                display: 'flex',         
                                justifyContent: 'end',   
                                alignItems: 'center',    
                                width: 'fit-content',
                                height: 'fit-content',   
                                marginLeft: 'auto',      
                                marginTop:'5px',
                            }}
                            >
                            <strong>{dataRow.title}</strong>
                            <div>
                                {dataRow.status === 'active' ? <ActiveBuzz /> : <InactiveBuzz />}
                            </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="Start Date" 
                                    variant="outlined"
                                    fullWidth
                                    value={`${dataRow.start_Date.split(" ")[0]}`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>


                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="Created At" 
                                    variant="outlined"
                                    fullWidth
                                    value={`${dataRow.created_At.split(" ")[0]}`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                            {dataRow.created_At === dataRow.updated_At ? (
                                <TextField
                                    label="Updated At"
                                    variant="outlined"
                                    fullWidth
                                    value={"There is no update"}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                />
                                ) : (
                                <TextField
                                    label="Updated At"
                                    variant="outlined"
                                    fullWidth
                                    value={`${dataRow.updated_At.split(" ")[0]} - ${dataRow.updated_At.split(" ")[1]}`}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="End Date" 
                                    variant="outlined"
                                    fullWidth
                                    value={`${dataRow.end_Date.split(" ")[0]}`}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            
                            
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="Code" 
                                    variant="outlined"
                                    fullWidth
                                    value={`${dataRow.code}`}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="Value" 
                                    variant="outlined"
                                    fullWidth
                                    value={`${dataRow.value}`}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="Percentage"
                                    variant="outlined"
                                    fullWidth
                                    value={dataRow.percentage}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    label="Created By"
                                    variant="outlined"
                                    fullWidth
                                    value={dataRow.created_By}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    value={dataRow.description}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                    multiline
                                    rows={2}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    label="Terms"
                                    variant="outlined"
                                    fullWidth
                                    value={dataRow.terms}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                    multiline
                                    rows={2}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6} md={6}>
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                        <TimelapseIcon sx={{ color: 'gold' }}/>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <span style={{fontSize: '12px', fontWeight: 'bold'}}>Max Usage</span> <br />
                                        <strong>{dataRow.max_Usage}</strong>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                        <PeopleAltIcon  sx={{ color: '#EF4770'}}/>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <span style={{fontSize: '12px', fontWeight: 'bold'}}>Max Usage Per User</span> <br />
                                        <strong>{dataRow.max_Usage_Per_User}</strong>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                        <LayersIcon  sx={{color: '#11B886'}}/>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <span style={{fontSize: '12px', fontWeight: 'bold'}}>Min Order</span> <br />
                                        <strong>{dataRow.min_Order}</strong>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                        <DataUsageIcon   sx={{ color: 'yellowgreen' }}/>
                                    </div>
                                    <div style={{ marginLeft: '10px' }}>
                                        <span style={{fontSize: '12px', fontWeight: 'bold'}}>Max Value</span> <br />
                                        <strong>{dataRow.max_Value}</strong>
                                    </div>
                                </div>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </Modal>
    </>
  )
};

export default PreviewVoucherModal;
