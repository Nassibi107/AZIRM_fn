import { Modal, Box, Grid, TextField, MenuItem, Button} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import axios from 'axios';
import qs from 'qs';

const EditVoucherTemplateModal = ({ isEdit, handlePreview, dataRow, reloader}) => {

    const [status, setStatus] = useState(dataRow.status);
    const handleChangeStatus = (value) => {
        setStatus(value);
        formik.setFieldValue('status', value);
    };

    const handleStartDateChange = (date) => {
        if (date && !isNaN(new Date(date).getTime())) {
          const formattedDate = new Date(date).toISOString().split('T')[0];
          formik.setFieldValue('startDate', formattedDate);
          console.log(formattedDate);
        } else {
          formik.setFieldValue('startDate', '');
          console.warn('Invalid date input');
        }
    };

    const handleEndDateChange = (date) => {
        if (date && !isNaN(new Date(date).getTime())) {
          const formattedDate = new Date(date).toISOString().split('T')[0];
          formik.setFieldValue('endDate', formattedDate);
          console.log(formattedDate);
        } else {
          formik.setFieldValue('endDate', '');
          console.warn('Invalid date input');
        }
      };
    

    const reset = () => {
        setStatus(dataRow.status);
        formik.resetForm({
            values: {
                description: '',
                title: dataRow.title || '',
                terms: dataRow.terms || '',
                valueV: dataRow.value || 1,
                percentage: dataRow.percentage || 5,
                maxUsage: dataRow.max_Usage || 0,
                maxUsagePerUser: dataRow.max_Usage_Per_User || 0,
                maxValue: dataRow.max_Value || 0,
                minOrder: dataRow.min_Order || 0,
                status: dataRow.status || 'active',
                startDate: dataRow.start_Date,
                endDate: dataRow.end_Date,
            },
        });
    };

    useEffect(() => {
        if (isEdit) {
            reset();
        }
    }, [isEdit]);



    const validationSchema = Yup.object({
        description: Yup.string().required('Description is required!').min(5, 'Description must be at least 5 characters long'),
        title: Yup.string().required('Title is required!').min(3, 'Title must be at least 3 characters long'),
        terms: Yup.string().required('Terms is required!').min(5, 'Terms must be at least 5 characters long'),
        valueV: Yup.number().required('Value is required!').min(1, 'Value must be at least 1'),
        percentage: Yup.number().required('Percentage is required!').min(1, 'Value must be at least 1').max(100, 'Value must not exceed 100'),
        maxUsage: Yup.number().required('Max Usage is required!').min(1, 'Max Usage must be at least 1'),
        maxUsagePerUser: Yup.number().required('Max Usage Per User is required!').min(1, 'Max Usage Per User must be at least 1'),
        maxValue: Yup.number().required('Max Value is required!').min(1, 'Max Value must be at least 1'),
        minOrder: Yup.number().required('Min Order is required!').min(1, 'Min Order must be at least 1'),
        status: Yup.string().required('Status is required!').oneOf(['active', 'inactive'], 'Invalid Status'),
        startDate: Yup.date().required('Start Date is required').nullable(),
        endDate: Yup.date().required('End Date is required').nullable(),
    });

    const formik = useFormik({
        initialValues: {
            description: '',
            title: dataRow.title || '',
            terms: dataRow.terms || '',
            valueV: dataRow.value || 1,
            percentage: dataRow.percentage || 5,
            maxUsage: dataRow.max_Usage || 0,
            maxUsagePerUser: dataRow.max_Usage_Per_User || 0,
            maxValue: dataRow.max_Value || 0,
            minOrder: dataRow.min_Order || 0,
            status: dataRow.status || 'active',
            startDate: dataRow.start_Date,
            endDate: dataRow.end_Date,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Updated', values);
            const dataEdit = {
                title: values.title,
                value: values.valueV,
                percentage: values.percentage,
                max_value: values.maxValue,
                max_usage: values.maxUsage,
                max_usage_per_user: values.maxUsagePerUser,
                min_order: values.minOrder,
                start_date: values.startDate,
                end_date: values.endDate,
                status: values.status,
                description: values.description,
                terms: values.terms,
            }
            editReward(dataEdit);
            console.log(dataEdit);
            
        },
    });

    const handleModalClose = () => {
        formik.resetForm();
        handlePreview();
    };


    async function editReward(editContent) {
        try {
          const response = await axios.put(`${import.meta.env.VITE_LV_URL}/voucher-templates/${dataRow.id}`, qs.stringify(editContent), {
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
                    maxHeight: '85vh',
                    overflowY: "auto",
                    width: { xs: "95%", sm: 800, md: 800 },
                    outline: "none",
                    borderRadius: "10px",
                    border: (theme) =>
                    `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"}`,
                    "&::-webkit-scrollbar": {
                    display: "none",
                    },
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={{ xs: 3, md: 3 }}>

                        <Grid item xs={12} sm={12} md={12} mb={{md: 0, xs: 2}}>
                            <Grid container spacing={1.5}>
                                <Grid item xs={12} sm={12} md={12} fontSize={20}>
                                    <strong>Edit Voucher</strong >
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
                                                <strong>You must update the <em>Description</em> field to proceed.</strong>
                                            </p>
                                        </>
                                    )}
                                    {Object.keys(formik.errors).length === 0 && formik.dirty && (
                                        <>
                                            <strong>All required fields are valid! You can save the changes.</strong><br />
                                        </>
                                    )}
                                    {formik.errors['title'] && (
                                        <>
                                            <strong>{formik.errors['title']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['description'] && (
                                        <>
                                            <strong>{formik.errors['description']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['terms'] && (
                                        <>
                                            <strong>{formik.errors['terms']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['valueV'] && (
                                        <>
                                            <strong>{formik.errors['valueV']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['percentage'] && (
                                        <>
                                            <strong>{formik.errors['percentage']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['maxUsage'] && (
                                        <>
                                            <strong>{formik.errors['maxUsage']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['maxUsagePerUser'] && (
                                        <>
                                            <strong>{formik.errors['maxUsagePerUser']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['maxValue'] && (
                                        <>
                                            <strong>{formik.errors['maxValue']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['minOrder'] && (
                                        <>
                                            <strong>{formik.errors['minOrder']}</strong><br />
                                        </>
                                    )}

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        fullWidth
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                        placeholder="Enter the title here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Value"
                                        variant="outlined"
                                        fullWidth
                                        name="valueV"
                                        value={formik.values.valueV}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.valueV && Boolean(formik.errors.valueV)}
                                        helperText={formik.touched.valueV && formik.errors.valueV}
                                        placeholder="Enter the value here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Percentage"
                                        variant="outlined"
                                        fullWidth
                                        name="percentage"
                                        value={formik.values.percentage}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.percentage && Boolean(formik.errors.percentage)}
                                        helperText={formik.touched.percentage && formik.errors.percentage}
                                        placeholder="Enter the percentage here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Max Usage"
                                        variant="outlined"
                                        fullWidth
                                        name="maxUsage"
                                        value={formik.values.maxUsage}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.maxUsage && Boolean(formik.errors.maxUsage)}
                                        helperText={formik.touched.maxUsage && formik.errors.maxUsage}
                                        placeholder="Enter the Max Usage here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container spacing={2.5}>
                                
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Max Usage Per User"
                                        variant="outlined"
                                        fullWidth
                                        name="maxUsagePerUser"
                                        value={formik.values.maxUsagePerUser}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.maxUsagePerUser && Boolean(formik.errors.maxUsagePerUser)}
                                        helperText={formik.touched.maxUsagePerUser && formik.errors.maxUsagePerUser}
                                        placeholder="Enter the Max Usage Per User here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Max Value"
                                        variant="outlined"
                                        fullWidth
                                        name="maxValue"
                                        value={formik.values.maxValue}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.maxValue && Boolean(formik.errors.maxValue)}
                                        helperText={formik.touched.maxValue && formik.errors.maxValue}
                                        placeholder="Enter the Max Value here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Min Order"
                                        variant="outlined"
                                        fullWidth
                                        name="minOrder"
                                        value={formik.values.minOrder}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.minOrder && Boolean(formik.errors.minOrder)}
                                        helperText={formik.touched.minOrder && formik.errors.minOrder}
                                        placeholder="Enter the Min Order here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Status"
                                        variant="outlined"
                                        fullWidth
                                        name="status"
                                        value={formik.values.status}
                                        onChange={(e) => handleChangeStatus(e.target.value)}
                                        error={formik.touched.status && Boolean(formik.errors.status)}
                                        helperText={formik.touched.status && formik.errors.status}
                                    >
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </TextField>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container spacing={2.5}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <DatePicker
                                    label="Start Date"
                                    value={formik.values.startDate ? new Date(formik.values.startDate) : null}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => (
                                                <TextField
                                                {...params}
                                                fullWidth
                                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                                helperText={formik.touched.startDate && formik.errors.startDate}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <DatePicker
                                        label="End Date"
                                        value={formik.values.endDate ? new Date(formik.values.endDate) : null}
                                        onChange={handleEndDateChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                                helperText={formik.touched.endDate && formik.errors.endDate}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container spacing={2.5}>

                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        label="Terms"
                                        variant="outlined"
                                        fullWidth
                                        name="terms"
                                        value={formik.values.terms}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.terms && Boolean(formik.errors.terms)}
                                        helperText={formik.touched.terms && formik.errors.terms}
                                        multiline
                                        rows={3.3}
                                        placeholder="Enter the terms here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        multiline
                                        rows={3.3}
                                        placeholder="Enter the description here its requierd"
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

export default EditVoucherTemplateModal;
