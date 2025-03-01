import { Alert, Box, Button, Card, Grid, IconButton, InputLabel, MenuItem, Select, styled, Switch, TextField } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as Yup from "yup";
import { useFormik } from "formik"; // CUSTOM COMPONENTS
import axios from "axios";
import { Paragraph, Small } from "@/components/typography";
import { FlexBetween, FlexRowAlign } from "@/components/flexbox"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENTS
import { useState } from "react";
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const _URL_API= import.meta.env.VITE_URL_API;
const SwitchWrapper = styled(FlexBetween)({
  width: "100%",
  marginTop: 10
});
const StyledCard = styled(Card)({
  padding: 24,
  minHeight: 400,
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
});
const ButtonWrapper = styled(FlexRowAlign)(({
  theme
}) => ({
  width: 100,
  height: 100,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[isDark(theme) ? 700 : 100]
}));
const UploadButton = styled(FlexRowAlign)(({
  theme
}) => ({
  width: 50,
  height: 50,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[isDark(theme) ? 600 : 200],
  border: `1px solid ${theme.palette.background.paper}`
}));

const AddNewUserPageView = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: "",
    address: "",
    password: "",
    label: ""
  };
  const [alertMessage, setAlertMessage] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState(null); 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    phoneNumber: Yup.number().min(8).required("Phone is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    role: Yup.string().required("Role is Required!"),
    address: Yup.string().required("Address is Required!"),
    password: Yup.string().required("Password is Required!"),
    
  });
  
    const _handleSubmit = async (values) => {
          try {
               const body = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  address: values.address,
                  password: values.password,
                  role: values.role,
                  label: values.label
               }
               console.log(_URL_API);
              const response = await axios.post(`${_URL_API}/register`, body,{
                  headers: {
                      'Content-Type': 'application/json',
              }});
              setAlertMessage("User created successfully!");
               setAlertSeverity("success");
          }
          catch (error) {
              console.log(error);
              setAlertMessage(error.response);
              setAlertSeverity("error");
          }
    }
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      _handleSubmit(values);
    }
  });

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
    
        <Grid item md={4} xs={12}>
          <StyledCard>
            <ButtonWrapper>
              <UploadButton>
                <label htmlFor="upload-btn">
                  <input accept="image/*" id="upload-btn" type="file" style={{ display: "none" }} />
                  <IconButton component="span">
                    <PhotoCamera sx={{ fontSize: 26, color: "grey.400" }} />
                  </IconButton>
                </label>
              </UploadButton>
            </ButtonWrapper>

            <Paragraph marginTop={2} maxWidth={200} display="block" textAlign="center" color="text.secondary">
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
            </Paragraph>

            <Box maxWidth={250} marginTop={5} marginBottom={1}>
              <SwitchWrapper>
                <Paragraph display="block" fontWeight={600}>
                  Public Profile
                </Paragraph>

                <Switch defaultChecked />
              </SwitchWrapper>

              <Small display="block" color="text.secondary">
                Apply disable account
              </Small>

              <SwitchWrapper>
                <Paragraph display="block" fontWeight={600}>
                  Email Verified
                </Paragraph>

                <Switch defaultChecked />
              </SwitchWrapper>

              <Small display="block" color="text.secondary">
                Disabling this will automatically send the user a verification email
              </Small>
            </Box>
          </StyledCard>
        </Grid>

        <Grid item md={8} xs={12}>
        <Grid item lg={12 }xs={12}>
                      {alertMessage && (
                        <Alert severity={alertSeverity} sx={{ my: 2 }}>
                          {alertMessage}
                        </Alert>
                      )}</Grid>
          <Card sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <InputLabel id="firstName-label">First Name</InputLabel>
                  <TextField 
                    fullWidth 
                    name="firstName" 
                    value={values.firstName} 
                    onChange={handleChange} 
                    helperText={touched.firstName && errors.firstName} 
                    error={Boolean(touched.firstName && errors.firstName)} 
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <InputLabel id="lastName-label">Last Name</InputLabel>
                  <TextField 
                    fullWidth 
                    name="lastName" 
                    value={values.lastName} 
                    onChange={handleChange} 
                    helperText={touched.lastName && errors.lastName} 
                    error={Boolean(touched.lastName && errors.lastName)} 
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel id="email-label">Email</InputLabel>
                  <TextField 
                    fullWidth 
                    name="email" 
                    value={values.email} 
                    onChange={handleChange} 
                    helperText={touched.email && errors.email} 
                    error={Boolean(touched.email && errors.email)} 
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel id="phone-label">Phone</InputLabel>
                  <TextField 
                    fullWidth 
                    name="phoneNumber" 
                    value={values.phoneNumber} 
                    onChange={handleChange} 
                    helperText={touched.phoneNumber && errors.phoneNumber} 
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)} 
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel id="address-label">Address</InputLabel>
                  <TextField 
                    fullWidth 
                    name="address" 
                    value={values.address} 
                    onChange={handleChange} 
                    helperText={touched.address && errors.address} 
                    error={Boolean(touched.address && errors.address)} 
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel id="password-label">Password</InputLabel>
                  <TextField 
                    fullWidth 
                    name="password" 
                    value={values.password} 
                    onChange={handleChange} 
                    helperText={touched.password && errors.password} 
                    error={Boolean(touched.password && errors.password)} 
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role-select"
                    name="role"
                    label="Role"
                    value={values.role}
                    onChange={handleChange}
                    helperText={touched.role && errors.role} 
                    error={Boolean(touched.role && errors.role)} 
                    fullWidth
                  >
                    <MenuItem value="">----</MenuItem>
                    <MenuItem value="admin">gerant</MenuItem>
                    <MenuItem value="assistant">assistant</MenuItem>
                    <MenuItem value="teamLeader">teamLeader</MenuItem>
                    <MenuItem value="Leader">Leader</MenuItem>
                    <MenuItem value="distbituer">distbituer</MenuItem>
                  </Select>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel id="label-label">Label</InputLabel>
                  <Select
                    labelId="label-label"
                    id="label-select"
                    name="label"
                    label="Label"
                    value={values.label}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="">----</MenuItem>
                    <MenuItem value="2">LSI</MenuItem>
                    <MenuItem value="3">LvM</MenuItem>
                    <MenuItem value="4">Kenzo</MenuItem>
                    <MenuItem value="nexsus">nexsus</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Create User
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewUserPageView;
