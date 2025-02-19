import { Modal, Box, Grid, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import { isDark } from "@/utils/constants";

import Emergency from '@/icons/Emergency.jsx'
import Investment from '@/icons/Investment.jsx'
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const PreviewPaidTrialPriceModal = ({ isPriview, handlePreview, dataRow }) => {
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
                    maxWidth: 800,
                    maxHeight: 550,
                    overflowY: "auto",
                    width: "80%",
                    outline: "none",
                    borderRadius: '10px',
                    border: (theme) =>
                        `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"}`,
                }}
            >
            <Grid container spacing={{ xs: 3, md: 3 }}>

                <Grid item xs={12} sm={12} md={12} mb={{md: 0, xs: 2}}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12} sm={12} md={12} fontSize={20}>
                            <strong>{`Paid Trial Price`}</strong>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>

                    <Grid container spacing={2.5}>
                        
                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="ID" 
                                variant="outlined"
                                fullWidth
                                value={`${dataRow.id}`}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <TextField
                                label="Created At" 
                                variant="outlined"
                                fullWidth
                                value={`${dataRow.created_At.split(" ")[0]} - ${dataRow.created_At.split(" ")[1]}`}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
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

                        <Grid item xs={12} sm={12} md={6}>
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                    <Emergency sx={{ color: '#11B886' }} />
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <span style={{fontSize: '12px', fontWeight: 'bold'}}>Price</span> <br />
                                    <strong>{dataRow.price}</strong>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                    <Investment  sx={{ color: '#EF4770' }}/>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <span style={{fontSize: '12px', fontWeight: 'bold'}}>Count</span> <br />
                                    <strong>{dataRow.count}</strong>
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

export default PreviewPaidTrialPriceModal;
