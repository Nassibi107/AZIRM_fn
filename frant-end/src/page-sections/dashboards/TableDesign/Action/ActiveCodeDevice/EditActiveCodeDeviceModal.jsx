import { Modal, Box, Grid, TextField, MenuItem, Button} from '@mui/material';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

const EditActiveCodeDeviceModal = ({ isEdit, handlePreview, dataRow, reloader}) => {

    const [packagesGet, setPackagesGet] = useState([]);
    useEffect(() => {
        const fetchPackages = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_LV_URL + '/packages', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${Cookies.get("accessToken")}`,
            },
            });
            // console.log(response.data.data);
            setPackagesGet(response.data.data);
        } catch (error) {
            console.error('An error occurred while fetching packages:', error);
        }
        };
        fetchPackages();
    }, []);

    const [voucherTemplateIdGet, setVoucherTemplateId] = useState([]);
    useEffect(() => {
        const fetchPackages = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_LV_URL + '/voucher-templates', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${Cookies.get("accessToken")}`,
            },
            });
            // console.log(response.data.data);
            setVoucherTemplateId(response.data.data);
        } catch (error) {
            console.error('An error occurred while fetching Voucher templates:', error);
        }
        };
        fetchPackages();
    }, []);


    const [status, setStatus] = useState(dataRow.status);
    const [periodType, setPeriodType] = useState(dataRow.objective_Period_Type);

    const handleChangeStatus = (value) => {
        setStatus(value);
        formik.setFieldValue('status', value);
    };

    const handleChangePeriodType = (value) => {
        setPeriodType(value);
        formik.setFieldValue('periodType', value);
    };

    const reset = () => {
        setStatus(dataRow.status);
        setPeriodType(dataRow.objective_Period_Type);
        formik.resetForm({
            values: {
                name: dataRow.name || '',
                description: '',
                objectivePeriodValue: dataRow.objective_Period_Value || '',
                salePackageObjective: dataRow.sale_Package_Objective || '',
                periodType: dataRow.objective_Period_Type || '',
                status: dataRow.status || '',
                packageId: dataRow.package_Id || '',
                voucherTemplateId: dataRow.voucher_Template_Id || '',
            },
        });
    };
    

    useEffect(() => {
        if (isEdit) {
            reset();
        }
    }, [isEdit]);
    


    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!').min(3, 'Name must be at least 3 characters long'),
    });
    
    const formik = useFormik({
        initialValues: {
            name: dataRow.name || '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Updated', values);
            const dataEdit = {
                name: values.name
            }
            console.log("data to send >>", dataEdit);
            UpdateActiveCodeDevice(dataEdit);
        },
    });

    const handleModalClose = () => {
        formik.resetForm();
        handlePreview();
    };


    async function UpdateActiveCodeDevice(editContent) {
        try {
          const response = await axios.put(`${import.meta.env.VITE_LV_URL}/activecode-devices/${dataRow.id}`, qs.stringify(editContent), {
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
                                    <strong>Edit Active Code Device</strong >
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
                                                <strong>You must update the <em>Name</em> field to proceed.</strong>
                                            </p>
                                        </>
                                    )}
                                    {Object.keys(formik.errors).length === 0 && formik.dirty && (
                                        <>
                                            <strong>All required fields are valid! You can save the changes.</strong><br />
                                        </>
                                    )}
                                    {formik.errors['name'] && (
                                        <>
                                            <strong>{formik.errors['name']}</strong><br />
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        name="name"
                                        // value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        placeholder={`${formik.values.name}`}
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

export default EditActiveCodeDeviceModal;
