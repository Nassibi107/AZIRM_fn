import React, { useState } from 'react';
import { Box, styled, Modal as MuiModal, TextField , Grid , Button , MenuItem } from "@mui/material";
import { H6 } from "@/components/typography";
import { FlexBetween } from "@/components/flexbox";

// STYLED COMPONENT
const Wrapper = styled(Box)(({ theme }) => ({
    top: "50%",
    left: "50%",
    padding: 10,
    maxWidth: 680,
    width: "100%",
    borderRadius: 16,
    position: "absolute",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme.palette.background.paper
}));

const ModalDownloadPlaylist = ({ children, open, handleClose, id , username , password , dns ,  ...props }) => {
    const [type , setType] = useState()
    const handleChangeType = (e) => {
        setType(e.target.value)
    }
    const text = `
        Username: ${username}
        Password: ${password}
        DNS: ${dns}
        Samsung and LG DNS: http://tmphmnnd.smart-tv.xyz`

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${dns}/get.php?username=${username}&password=${password}&type=${type}&output=mpegts`);
    }

    const handleCopyText = () => {
        navigator.clipboard.writeText(text);
    }
  return (
    <MuiModal open={open} onClose={handleClose}>
        <Wrapper {...props}>
            {children}
            <Box>
                <Grid container>
                    <Grid item sm={12} xs={12}>
                        <H6 fontSize={14} px={3} py={2} sx = {{ textAlign : "center" }}>Download Playlist</H6>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField fullWidth select label="Type" value={type} onChange={handleChangeType}> 
                            <MenuItem value="m3u_plus">M3u with options</MenuItem>
                            <MenuItem value="enigma16">Enigma 2 OE 1.6</MenuItem>
                            <MenuItem value="dreambox">DreamBox OE 2.0</MenuItem>
                            <MenuItem value="m3u">M3u</MenuItem>
                            <MenuItem value="simple">Simple list</MenuItem>
                            <MenuItem value="octagon">Octagon</MenuItem>
                            <MenuItem value="starlivev3">Starlive v3/StarSat HD6060/AZclass</MenuItem>
                            <MenuItem value="mediastar">MediaStar / StarLive v4</MenuItem>
                            <MenuItem value="enigma216_script">Enigma 2 OE 1.6 Auto Script</MenuItem>
                            <MenuItem value="enigma22_script">Enigma 2 OE 2.6 Auto Script</MenuItem>
                            <MenuItem value="starlivev5">StarLive v5</MenuItem>
                            <MenuItem value="webtvlist">WebTV List</MenuItem>
                            <MenuItem value="octagon_script">Octagon Auto Script</MenuItem>
                            <MenuItem value="ariva">Ariva</MenuItem>
                            <MenuItem value="spark">Spark</MenuItem>
                            <MenuItem value="gst">Geant/Starsat/Tiger/Qmax/Hyper/Royal</MenuItem>
                            <MenuItem value="fps">Fortec999/Prifix9400/Starport</MenuItem>
                            <MenuItem value="revosun">Revolution 60/60 | Sunplus</MenuItem>
                            <MenuItem value="zorro">Zorro</MenuItem>
                            <MenuItem value="gigablue">GigaBlue</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} my={1}>
                        <TextField fullWidth label="Link :" value={`${dns}/get.php?username=${username}&password=${password}&type=${type}&output=mpegts`} disabled/>
                    </Grid>
                    <Grid item xs={12} my={1}>
                        <FlexBetween>
                            <Button fullWidth color="success" sx={{ mx : 1 }} onClick={handleCopyLink}>Copy Link</Button>
                            <Button fullWidth color="primary" sx={{ mx : 1 }}>Send To Telegram</Button>
                            <Button fullWidth color="secondary" sx={{ mx : 1 }}>Send To Whatssap</Button>
                        </FlexBetween>
                    </Grid>
                    <Grid item xs={12} my={1}>
                        <TextField multiline value={text} fullWidth rows={10} label="Text:" sx={{"& .MuiOutlinedInput-root textarea": { padding: 0}}} disabled/>
                    </Grid>
                    <Grid item xs={12} my={1} mb={1}>
                        <FlexBetween>
                            <Button fullWidth color="success" sx={{ mx : 1 }} onClick={handleCopyText}>Copy Text</Button>
                            <Button fullWidth color="primary" sx={{ mx : 1 }}>Send To Telegram</Button>
                            <Button fullWidth color="secondary" sx={{ mx : 1 }}>Send To Whatssap</Button>
                        </FlexBetween>
                    </Grid>
                    <Grid container>
                        <Button fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    </MuiModal>
  );
};

export default ModalDownloadPlaylist;
