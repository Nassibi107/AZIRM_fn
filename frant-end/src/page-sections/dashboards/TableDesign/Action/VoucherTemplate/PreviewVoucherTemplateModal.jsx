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

const PreviewVoucherTemplateModal = ({ isPriview, handlePreview, dataRow }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));


    // const columns = 
    // [
    //   'id.1',
    //   'status.1',


    //   'title.1', Done
    //   'code.0', Done
    //   'value.0', Done
    //   'percentage.0', Done

    //   'description.0', Done
    //   'terms.0', Done

    //   'created_By.0', Done

    //   'max_Usage.0', Done
    //   'min_Order.0', Done
    //   'max_Value.0', Done
    //   'max_Usage_Per_User.0', Done

    
    //   'start_Date.1',  Done
    //   'created_At.1', Done
    //   'updated_At.1', Done
    //   'end_Date.1', Done
    // ];


    // {
    //     "id": 1,
    //     "value": 1,
    //     "title": "TestOnes",
    //     "code": "4e8d5beb-0f49-491d-93cb-688f1e193bed", 
    //     "terms": "Non", 
    //     "status": "active",
    //     "description": "This just for test",

    //     "percentage": 100,
    //     "max_value": 10000,
    //     "max_usage": 1,
    //     "max_usage_per_user": 1,
    //     "min_order": 0,
    //     "created_by": 12,
    
    
    //     "start_date": "2024-09-16",
    //     "end_date": "2025-09-16",
    //     "created_at": "2024-11-14 14:18:20",
    //     "updated_at": "2024-11-14 14:18:20"
    // },


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
                    width: { xs: "95%", sm: "85%", md: "50%" },
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
                                xs={12}
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
                                <strong>Voucher Template Preview</strong>
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
                                    label="Title" 
                                    variant="outlined"
                                    fullWidth
                                    value={`${dataRow.title}`}
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

export default PreviewVoucherTemplateModal;
