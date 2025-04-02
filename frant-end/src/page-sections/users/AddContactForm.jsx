import { Box, Grid, Stack, Button, Avatar, TextField, IconButton, useMediaQuery, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import * as Yup from "yup"; // CUSTOM COMPONENTS
import "./style.css"
import { H5 } from "@/components/typography";
import { Scrollbar } from "@/components/scrollbar";
import { AvatarBadge } from "@/components/avatar-badge"; // ==========================================================================
import axios from "axios";
import { useState } from "react";
const ADMIN_ROUTE = import.meta.env.VITE_ADMIN_URL;
// ==========================================================================
const AddContactForm = ({
  handleCancel,
  data
}) => {
   const [alertMessage, setAlertMessage] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [alertSeverity, setAlertSeverity] = useState(null); 
  const downSm = useMediaQuery(theme => theme.breakpoints.down("sm"));
  const initialValues = data 
  ? {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      role: data.role,
      address: data.address,
      password: "",
      label: data.label
    }
  : {};
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
    
      const response = await axios.put(`${ADMIN_ROUTE}/user/${data.id}`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAlertMessage("User update successfully!");
      setAlertSeverity("success");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setAlertMessage(error.response);
      setAlertSeverity("error"); //
    }
  };

  // Formik hook for handling the form
  const { values, errors, handleChange, handleSubmit, handleBlur,touched } = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // Ensure the form reinitializes when user data changes
    onSubmit: (values) => {
      _handleSubmit(values);
    
    }
  });
  return <Box>
      <H5 fontSize={16} mb={4}>
        Add Contact
      </H5>

      <form onSubmit={handleSubmit}>
        <Scrollbar autoHide={false} style={{
        maxHeight: downSm ? 300 : ""
      }}>
          <Stack direction="row" justifyContent="center" mb={6}>
            <AvatarBadge badgeContent={<label htmlFor="icon-button-file">
                  <input type="file" accept="image/*" id="icon-button-file" style={{
              display: "none"
            }} />

                  <IconButton aria-label="upload picture" component="span">
                    <CameraAlt sx={{
                fontSize: 16,
                color: "background.paper"
              }} />
                  </IconButton>
                </label>}>
              <Avatar src={data?.uimg || "/static/avatar/001-man.svg"} sx={{
              width: 80,
              height: 80,
              backgroundColor: "grey.100"
            }} />
            </AvatarBadge>
          </Stack>

        <Grid container spacing={3}>
            <Grid item lg={12 }xs={12}>
                                        {alertMessage && (
                                          <Alert severity={alertSeverity} sx={{ my: 2 }}>
                                            {alertMessage}
                                          </Alert>
                                        )}</Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="firstName" label="First Name" variant="standard" onBlur={handleBlur} value={values.firstName} onChange={handleChange} error={Boolean(errors.firstName && touched.firstName)} helperText={touched.firstName && errors.firstName} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="lastName" label="Last Name" variant="standard" onBlur={handleBlur} value={values.lastName} onChange={handleChange} error={Boolean(errors.lastName && touched.lastName)} helperText={touched.lastName && errors.lastName} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="email" type="email" label="Email" variant="standard" onBlur={handleBlur} value={values.email} onChange={handleChange} error={Boolean(errors.email && touched.email)} helperText={touched.email && errors.email} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="phone" label="Phone Number" variant="standard" onBlur={handleBlur} value={values.phoneNumber} onChange={handleChange} error={Boolean(errors.phoneNumber && touched.phoneNumber)} helperText={touched.phone && errors.phone} />
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
                              <MenuItem value="admin">gerant</MenuItem>
                              <MenuItem value="assistant">assistant</MenuItem>
                              <MenuItem value="teamLeader">teamLeader</MenuItem>
                              <MenuItem value="Leader">Leader</MenuItem>
                              <MenuItem value="distribuer">distributuer</MenuItem>
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
        <Grid item sm={12} xs={12}>

            <div className='cardss'>

              <div className="e-card playing">
              <div className="image"></div>  
              <div className="wave"></div>
              
              
              <h4 style={{ color: 'white', margin: "15px 20px", position:'absolute', zIndex: "500" }}>Update your user</h4><br/>
              <br/>
              <h5 >
              it’s your key to staying connected, enhancing your experience, and ensuring seamless collaboration.
              </h5>
              </div>
            </div>
          </Grid>
          </Grid>
        </Scrollbar>

        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button type="submit" size="small">
            Save
          </Button>

          <Button variant="outlined" size="small" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>;
};

export default AddContactForm;