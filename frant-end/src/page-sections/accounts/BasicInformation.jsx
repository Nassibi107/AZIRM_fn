import { Fragment, useContext, useEffect, useState } from "react";
import { Box, Button, Card, Divider, Grid, styled, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { CameraAlt } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { KeyboardArrowDown } from "@mui/icons-material";

import DateRange from "@/icons/DateRange";
import Bratislava from "@/icons/Bratislava";
import MapMarkerIcon from "@/icons/MapMarkerIcon";

import { AvatarBadge } from "@/components/avatar-badge";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import { H6, Paragraph } from "@/components/typography";
import { AvatarLoading } from "@/components/avatar-loading";
import { AuthContext } from "../../contexts/jwtContext";




const ContentWrapper = styled(Box)(({
  theme
}) => ({
  zIndex: 1,
  marginTop: 55,
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 20,
    paddingRight: 20
  }
}));
const CoverPicWrapper = styled(Box)(({
  theme
}) => ({
  top: 0,
  left: 0,
  height: 125,
  width: "100%",
  overflow: "hidden",
  position: "absolute",
  backgroundColor: theme.palette.background.default
}));



const BasicInformation = () => {
  const {
    user
  } = useContext(AuthContext);
  const initialValues = {
    firstName: user.full_name,
    email: user.email,
    userName: user.username,
    organization: "",
    department: "",
    country: "",
    state: "",
    address: "",
    zipCode: 4336
  };
  
  const validationSchema = Yup.object({
    fullName: Yup.string().min(3, "Must be greater then 3 characters").required("First Name is Required!"),
    email: Yup.string().email("Invalid email address").required("Email is Required!"),
    userName: Yup.string().min(9).required("Username is required!"),
    whatssap: Yup.string().required("Whatssap is Required!"),
    Telegram: Yup.string().required("Telegram is Required!"),
    DNS: Yup.string().required("DNS is Required!"),
    Note: Yup.string().required("Note is Required!"),
  });
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => console.log(values)
  });
  const [whatssap , setWhatssap] = useState()
  const [Telegram , setTelegram] = useState()
  const [Dns , setDns] = useState("ip365.cx")
  const [Note , setNote] = useState()
  const [bouquetChildren , setBouquetChildren] = useState("No")
  const handleChangeBouquetChildren = (e) => {
    setBouquetChildren(e.target.value)
  }
  
  const formattedDate = new Date(user.createdAt).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    console.log(user);
  }, []);
  return <Fragment>
      <Card sx={{
      padding: 3,
      position: "relative"
    }}>
        {
        /* COVER IMAGE SECTION */
      }
        <CoverPicWrapper>
          <img width="100%" height="100%" alt="Team Member" src="/static/cover/user-cover-pic.png" style={{
          objectFit: "cover"
        }} />
        </CoverPicWrapper>

        {
        /* USER INFO SECTION */
      }
        <ContentWrapper>
          <FlexBox justifyContent="center">
            <AvatarBadge badgeContent={<label htmlFor="icon-button-file">
                  <input type="file" accept="image/*" id="icon-button-file" style={{
              display: "none"
            }} />

                  <IconButton aria-label="upload picture" component="span">
                    <CameraAlt sx={{
                fontSize: 16,
                color: "grey.400"
              }} />
                  </IconButton>
                </label>}>
              <AvatarLoading borderSize={2} percentage={60} alt="Team Member" src="/static/user/user-11.png" sx={{
              width: 100,
              height: 100
            }} />
            </AvatarBadge>
          </FlexBox>

          <Box mt={2}>
            <H6 fontSize={18} textAlign="center">
              {user?.firstName} {user?.lastName}
            </H6>

            <FlexBetween maxWidth={360} flexWrap="wrap" margin="auto" mt={1}>
              <FlexBox alignItems="center" gap={1} color="grey.500">
                <Bratislava sx={{
                fontSize: 18
              }} />
                <Paragraph>{user.data?.CmpRid}</Paragraph>
              </FlexBox>

              <FlexBox alignItems="center" gap={1} color="grey.500">
                <MapMarkerIcon sx={{
                fontSize: 18
              }} />
                <Paragraph>{user?.address}</Paragraph>
              </FlexBox>

              <FlexBox alignItems="center" gap={1} color="grey.500">
                <DateRange sx={{
                fontSize: 18
              }} />
                <Paragraph>{formattedDate}</Paragraph>
              </FlexBox>
            </FlexBetween>
          </Box>
        </ContentWrapper>
      </Card>

      {
      /* BASIC INFORMATION FORM SECTION */
    }
      <Card sx={{
      mt: 3
    }}>
        <H6 fontSize={14} px={3} py={2}>
          Basic Information
        </H6>

        <Divider />

        <form onSubmit={handleSubmit}>
          <Box margin={3}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="fullName" label="Full Name" variant="standard" onBlur={handleBlur}
                onChange={handleChange} value={user.firstName} helperText={touched.firstName && errors.firstName} error={Boolean(touched.firstName && errors.firstName)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="email" label="Email" variant="standard" onBlur={handleBlur} onChange={handleChange} value={user.email} helperText={touched.email && errors.email} error={Boolean(touched.email && errors.email)} />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="userName" label="Username" variant="standard" onBlur={handleBlur} onChange={handleChange} value={user.lastName} helperText={touched.userName && errors.userName} error={Boolean(touched.userName && errors.userName)}/>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="Whatsapp" label="Role" variant="standard" onBlur={handleBlur} onChange={handleChange} value={user.role} helperText={touched.whatssap && errors.whatssap} error={Boolean(touched.whatssap && errors.whatssap)}/>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField fullWidth name="phone" label="phone" variant="standard" onBlur={handleBlur} onChange={handleChange} value={user.phoneNumber} helperText={touched.whatssap && errors.whatssap} error={Boolean(touched.whatssap && errors.whatssap)}/>
              </Grid>

  

              <Grid item sm={6} xs={12}>
                <TextField select fullWidth value={bouquetChildren} onChange={handleChangeBouquetChildren} label="Hidden bouquet children" variant="standard" SelectProps={{
                  native: true,
                  IconComponent: KeyboardArrowDown
                }}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
                <Button variant="standard" sx={{
                ml: 2
              }}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Card>
    </Fragment>;
};

export default BasicInformation;
