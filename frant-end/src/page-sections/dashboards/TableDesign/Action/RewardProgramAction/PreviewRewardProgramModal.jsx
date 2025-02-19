import { Modal, Box, Grid, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import { isDark } from "@/utils/constants";

import Emergency from '@/icons/Emergency.jsx'
import Investment from '@/icons/Investment.jsx'
import TimelapseIcon from '@mui/icons-material/Timelapse';

const PreviewRewardProgramModal = ({ isPriview, handlePreview, dataRow }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
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
                            <strong>Reward Programe Preview</strong>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography
                                variant="body1"
                                sx={{
                                    ml: 0.5,
                                    color: (theme) => (isDark(theme) ? 'white' : 'rgba(0, 0, 0, 0.7)'),
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: "space-between",
                                }}
                                >
                                <span>
                                    <strong>Name:</strong> {dataRow.name}
                                </span>
                                {(isSm || isXs) && (
                                    <strong>
                                    <span
                                        style={{
                                        marginLeft: '10px',
                                        color: dataRow.status === "active" ? "#66bb6a" : "#ef5350",
                                        }}
                                    >
                                        {dataRow.status === "active" ? "Active" : "Inactive"}
                                    </span>
                                    </strong>
                                )}
                            </Typography>


                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
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
                                label="Package Id"
                                variant="outlined"
                                fullWidth
                                value={dataRow.package_Id}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={2.5}>
                        {(!isSm && !isXs) && (
                        <Grid item xs={12} sm={12} md={12} >
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                <span style={{ color: "white", marginRight: "10px" }}>Status:</span>{" "}

                                <span
                                    style={{
                                        color: dataRow.status === "active" ? "#66bb6a" : "#ef5350",
                                    }}
                                    >
                                    {dataRow.status === "active" ? "Active" : "Inactive"}
                                </span>
                                </Typography>
                        </Grid>
                        )}

                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                label="Voucher Template Id"
                                variant="outlined"
                                fullWidth
                                value={dataRow.voucher_Template_Id}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={dataRow.description}
                                InputProps={{
                                readOnly: true,
                                }}
                                multiline
                                rows={3.3}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={12} md={6}>
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                    <Emergency sx={{ color: '#11B886' }} />
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <span style={{fontSize: '12px', fontWeight: 'bold'}}>Sale Package Objective</span> <br />
                                    <strong>{dataRow.sale_Package_Objective}</strong>
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                <TimelapseIcon sx={{ color: 'gold' }}/>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <span style={{fontSize: '12px', fontWeight: 'bold'}}>Objective Period Type</span> <br />
                                    <strong>{dataRow.objective_Period_Type}</strong>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>

                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <div style={{ padding: '10px 10px 5px', background: '#374151', width: 'fit-content', borderRadius: '10px' }}>
                                    <Investment  sx={{ color: '#EF4770' }}/>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    <span style={{fontSize: '12px', fontWeight: 'bold'}}>objective Period Value</span> <br />
                                    <strong>{dataRow.objective_Period_Value}</strong>
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

export default PreviewRewardProgramModal;
