import { Modal, Box, Grid, TextField, MenuItem, Button} from '@mui/material';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

const EditPaidTrialPriceModal = ({ isEdit, handlePreview, dataRow, reloader}) => {

    const reset = () => {
        formik.resetForm({
            values: {
                price: dataRow.price,
                count: dataRow.count,
            },
        });
    };
    

    useEffect(() => {
        if (isEdit) {
            reset();
        }
    }, [isEdit]);
    


    const validationSchema = Yup.object({
        price: Yup.number().required('price is required'),
        count: Yup.number().required('count is required'),
    });
    
    const formik = useFormik({
        initialValues: {
            price: dataRow.price,
            count: dataRow.count,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Updated', values);
            const dataEdit = {
                price: values.price,
                count: values.count,
            }
            console.log("data to send >>", dataEdit);
            editPaidTrialPrice(dataEdit);
            
        },
    });

    const handleModalClose = () => {
        formik.resetForm();
        handlePreview();
    };

    async function editPaidTrialPrice(editContent) {
        try {
          const response = await axios.put(`${import.meta.env.VITE_LV_URL}/paid-trial-prices/${dataRow.id}`, qs.stringify(editContent), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'Authorization': `Bearer ${Cookies.get("accessToken")}`
            }
          });

          console.log("Response data:", response.data);
          reloader();
          handleModalClose();
        } catch (error) {
          if (error.response && error.response.status === 422) {
            console.log("A 422 error occurred, but it's being handled gracefully.");
          } else {
            console.error('An error occurred:', error);
          }
        }
      }
    
    return(
    <>
        <Modal
            open={isEdit}
            onClose={handleModalClose}
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
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={{ xs: 3, md: 3 }}>

                        <Grid item xs={12} sm={12} md={12} mb={{md: 0, xs: 2}}>
                            <Grid container spacing={1.5}>
                                <Grid item xs={12} sm={12} md={12} fontSize={20}>
                                    <strong>Edit Paid Trial Price</strong >
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* label of error */}

                        <Grid item xs={12} sm={12} md={12} mb={{ md: 0, xs: 2 }}>
                            <Grid 
                                container
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: Object.keys(formik.errors).length === 0 && formik.dirty
                                        ? '#52d89fa6'
                                        : 'rgb(152 203 255 / 32%)',
                                    borderRadius: '5px',
                                    padding: '10px',
                                }}
                            >
                                <Grid item xs={12} sm={12} md={12} fontSize={15}>
                                    {Object.keys(formik.errors).length === 0 && !formik.dirty && (
                                        <>
                                            <p>
                                                <strong>You must update the <em>Price</em> or <em>Count</em> field to proceed.</strong>
                                            </p>
                                        </>
                                    )}
                                    {Object.keys(formik.errors).length === 0 && formik.dirty && (
                                        <>
                                            <strong>All required fields are valid! You can save the changes.</strong><br />
                                        </>
                                    )}
                                    {formik.errors['price'] && (
                                        <>
                                            <strong>{formik.errors['price']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['count'] && (
                                        <>
                                            <strong>{formik.errors['count']}</strong><br />
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        label="Price"
                                        variant="outlined"
                                        fullWidth
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={formik.touched.price && formik.errors.price}
                                        placeholder="Enter the price here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        label="Count"
                                        variant="outlined"
                                        fullWidth
                                        name="count"
                                        value={formik.values.count}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.count && Boolean(formik.errors.count)}
                                        helperText={formik.touched.count && formik.errors.count}
                                        placeholder="Enter the count here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Submit
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Box>
        </Modal>
    </>
  )
};

export default EditPaidTrialPriceModal;
