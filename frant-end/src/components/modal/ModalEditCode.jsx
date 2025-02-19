import React, { useState } from 'react';
import { Box, styled, Modal as MuiModal, TextField , Grid , Button } from "@mui/material";
import { H6 } from "@/components/typography";
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

const validationSchema = Yup.object().shape({
  newName: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
});

const ModalEditCode = ({ children, open, handleClose, idName , name, BothPack, ...props }) => {
    const [newName , setNewName] = useState(name)

    async function createDevice(deviceCode) {
      try {
        const response = await axios.put(`${import.meta.env.VITE_LV_URL}/activecode-devices/${idName}`, qs.stringify(deviceCode), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Bearer ${Cookies.get("accessToken")}`
          }
        });
        
        console.log("Response data:", response.data);
        BothPack(1);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.log("A 422 error occurred, but it's being handled gracefully.");
        } else {
          console.error('An error occurred:', error);
        }
      }
    }

  return (
    <MuiModal open={open} onClose={handleClose}>
      <Wrapper {...props}>
        {children}
        <Box>
        <Formik
      initialValues={{ newName: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const data = {'name':values.newName};
        createDevice(data);
        resetForm()
      }}
    >
      {({ handleChange, handleBlur, values }) => (
        <Form>
          <Grid container>
            <Grid item sm={12} xs={12}>
              <H6 fontSize={14} px={3} py={2} sx={{ textAlign: 'center' }}>
                Edit: {name}
              </H6>
            </Grid>
            <Grid item xs={12} my={1}>
              <Field
                as={TextField}
                fullWidth
                label="Name :"
                name="newName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newName}
                error={Boolean(values.newName && !validationSchema.fields.newName.isValidSync(values.newName))}
                helperText={<ErrorMessage name="newName" />}
              />
            </Grid>
            <Grid container>
              <Button type="submit" fullWidth>
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
        </Box>
      </Wrapper>
    </MuiModal>
  );
};

export default ModalEditCode;
