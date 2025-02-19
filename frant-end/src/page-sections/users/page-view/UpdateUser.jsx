import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, IconButton, InputLabel, MenuItem, Select, styled, Switch, TextField } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";


const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;

const SwitchWrapper = styled('div')({
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

const ButtonWrapper = styled('div')(({ theme }) => ({
  width: 100,
  height: 100,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100]
}));

const UploadButton = styled('div')(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[200],
  border: `1px solid ${theme.palette.background.paper}`
}));

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);  // Initialize as null to handle loading state
  const [loading, setLoading] = useState(true); // Loading state to track when the user data is being fetched

  // Fetch user data by ID
  const _getUser = async () => {
    try {
      const res = await axios.get(`${ADMIN_ROUTE}/user/${id}`);
      setUser(res.data.data);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false even if there is an error
    }
  };

  // Call _getUser on component mount
  useEffect(() => {
    _getUser();
  }, [id]);

  // Initial form values, set after user data is fetched
  const initialValues = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        address: user.address,
        password: user.password,
        label: user.label
      }
    : {};

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is Required!"),
    lastName: Yup.string().required("Last Name is Required!"),
    phoneNumber: Yup.number().min(8).required("Phone is Required!"),
    email: Yup.string().email().required("Email is Required!"),
    role: Yup.string().required("Role is Required!"),
    address: Yup.string().required("Address is Required!"),
    password: Yup.string().required("Password is Required!")
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
      console.log(response.data);
    } catch (error) {
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
            <Box maxWidth={250} marginTop={5} marginBottom={1}>
              <SwitchWrapper>
                {/* <Paragraph display="block" fontWeight={600}>Public Profile</Paragraph> */}
                <Switch defaultChecked />
              </SwitchWrapper>
              <SwitchWrapper>
                {/* <Paragraph display="block" fontWeight={600}>Email Verified</Paragraph> */}
                <Switch defaultChecked />
              </SwitchWrapper>
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
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="leader">Leader</MenuItem>
                    <MenuItem value="user">User</MenuItem>
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
                    <MenuItem value="LSI">LSI</MenuItem>
                    <MenuItem value="LvM">LvM</MenuItem>
                    <MenuItem value="Kenzo">Kenzo</MenuItem>
                    <MenuItem value="nexsus">nexsus</MenuItem>
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
