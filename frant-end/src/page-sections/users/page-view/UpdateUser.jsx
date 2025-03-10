import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, Grid, IconButton, InputLabel, MenuItem, Select, styled, Switch, TextField } from "@mui/material";
import { FlexBetween, FlexRowAlign } from "@/components/flexbox"; 
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Paragraph, Small } from "@/components/typography";
import { isDark } from "@/utils/constants"; // STYLED COMPONENTS

const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
const VITE_LEADER= import.meta.env.VITE_LEADER_URL;
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

const UpdateUser = () => {

  const { id } = useParams();
  const [user, setUser] = useState(null);  // Initialize as null to handle loading state
  const [loading, setLoading] = useState(true); // Loading state to track when the user data is being fetched
  const [alertMessage, setAlertMessage] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState(null); 


  // Fetch user data by ID
  const _getUser = async () => {
    try {
     
        const res = await axios.get(`${ADMIN_ROUTE}/user/${id}`);
        setUser(res.data.data);
     
      setLoading(false); 
    // Set loading to false once the data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  // Call _getUser on component mount
  useEffect(() => {
    _getUser();
  }, [id ]);

  // Initial form values, set after user data is fetched
  const initialValues = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        address: user.address,
        password: "",
        label: user.label
      }
    : {};

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(4),
    lastName: Yup.string().min(4),
    phoneNumber: Yup.number().min(8),
    email: Yup.string().email(),
    role: Yup.string(),
    address: Yup.string(),
    password: Yup.string()
  });

  // Handle form submission
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
      };
      const response = await axios.put(`${ADMIN_ROUTE}/user/${id}`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
     
      });
      setAlertMessage("User update successfully!");
      setAlertSeverity("success");
      console.log(response.data);
    } catch (error) {
      setAlertMessage("error something went wrong");
      setAlertSeverity("error"); //
      console.log(error);
    }
  };

  // Formik hook for handling the form
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // Ensure the form reinitializes when user data changes
    onSubmit: (values) => {
      _handleSubmit(values);
    }
  });

  if (loading) {
    return <Box pt={2} pb={4}>Loading...</Box>; // Show loading state while user data is being fetched
  }

  return (
    <Box pt={2} pb={4}>
      <Grid container spacing={3}>
         <Grid item lg={12 }xs={12}>
                              {alertMessage && (
                                <Alert severity={alertSeverity} sx={{ my: 2 }}>
                                  {alertMessage}
                                </Alert>
                              )}</Grid>
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
          <Card sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <InputLabel>First Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder={user.firstName}
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    helperText={touched.firstName && errors.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder={user.lastName}
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    helperText={touched.lastName && errors.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    placeholder={user.email}
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel>Phone</InputLabel>
                  <TextField
                    placeholder={user.phoneNumber}
                    fullWidth
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel>Address</InputLabel>
                  <TextField
                    placeholder={user.address}
                    fullWidth
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    helperText={touched.address && errors.address}
                    error={Boolean(touched.address && errors.address)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    placeholder="*****************"
                    fullWidth
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    helperText={touched.password && errors.password}
                    error={Boolean(touched.password && errors.password)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    fullWidth
                    label="Role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
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
                  <InputLabel>Label</InputLabel>
                  <Select
                    fullWidth
                    label="Label"
                    name="label"
                    value={values.label}
                    onChange={handleChange}
                  >
                   <MenuItem value="">----</MenuItem>
                  <MenuItem value="1">azirm</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Update User
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

export default UpdateUser;
