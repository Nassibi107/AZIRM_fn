import { Modal, Box, Grid, TextField, Typography, useMediaQuery, useTheme} from '@mui/material';
import { isDark } from "@/utils/constants";

import Emergency from '@/icons/Emergency.jsx'
import Investment from '@/icons/Investment.jsx'
import TimelapseIcon from '@mui/icons-material/Timelapse';
import FlexBox from "@/components/flexbox/FlexBox";
import EditIcon from '@mui/icons-material/Edit';

const PreviewActiveCodeDeviceModal = ({ setIsEdit, isPriview, handlePreview, dataRow }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isXs = useMediaQuery(theme.breakpoints.only("xs"));


    const editIt = () => {
        console.log("1322");
        handlePreview();
        setIsEdit(true);
    }

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
                            <FlexBox gap={0.8} alignItems="center" justifyContent="space-between" >
                                <strong>Active Code Device Preview</strong>
                                <div onClick={editIt} style={{cursor:'pointer', padding: '2px 5px 0px', background: 'rgba(17, 184, 134, 0.2)', border: '0.5px solid rgba(17, 184, 134, 1)', borderRadius: '5px'}}>
                                    <EditIcon fontSize='small' sx={{color: '#11B886'}}/>
                                </div>
                            </FlexBox>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={dataRow.name}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                label="Id"
                                variant="outlined"
                                fullWidth
                                value={dataRow.id}
                                InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
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
                        <Grid item xs={12} sm={6} md={6}>
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
                        
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Modal>
    </>
  )
};

export default PreviewActiveCodeDeviceModal;
