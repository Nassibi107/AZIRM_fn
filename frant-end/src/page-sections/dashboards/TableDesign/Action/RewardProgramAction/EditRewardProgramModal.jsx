import { Modal, Box, Grid, TextField, MenuItem, Button} from '@mui/material';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

const EditRewardProgramModal = ({ isEdit, handlePreview, dataRow, reloader}) => {

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
        description: Yup.string().required('Description is required!').min(5, 'Description must be at least 5 characters long'),
        objectivePeriodValue: Yup.number().required('Objective Period Value is required!').min(1, 'Value must be at least 1'),
        salePackageObjective: Yup.number().required('Sale Package Objective is required!').min(1, 'Value must be at least 1'),
        periodType: Yup.string().required('Period Type is required!').oneOf(['day', 'month', 'year'], 'Invalid Period Type'),
        status: Yup.string().required('Status is required!').oneOf(['active', 'inactive'], 'Invalid Status'),
        packageId: Yup.number().required('Package is required'),
        voucherTemplateId: Yup.number().required('voucher Template Id is required'),
    });
    
    const formik = useFormik({
        initialValues: {
            name: dataRow.name || '',
            description: '',
            objectivePeriodValue: dataRow.objective_Period_Value || '',
            salePackageObjective: dataRow.sale_Package_Objective || '',
            periodType: dataRow.objective_Period_Type || '',
            status: dataRow.status || '',
            packageId: dataRow.package_Id || '',
            voucherTemplateId: dataRow.voucher_Template_Id || '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Updated', values);
            const dataEdit = {
                name: values.name,
                description: values.description,
                status: values.status,
                package_id: values.packageId,
                sale_package_objective: values.salePackageObjective,
                objective_period_type: values.periodType,
                objective_period_value: values.objectivePeriodValue,
                voucher_template_id: values.voucherTemplateId,
            }
            console.log("data to send >>", dataEdit);
            editReward(dataEdit);
            
        },
    });

    const handleModalClose = () => {
        formik.resetForm();
        handlePreview();
    };

    // useEffect(() => {
    //     console.log('Formik values:', formik.values);
    //     console.log('Formik errors:', formik.errors);
    // }, [formik.values, formik.errors]);

    async function editReward(editContent) {
        try {
          const response = await axios.put(`${import.meta.env.VITE_LV_URL}/reward-programs/${dataRow.id}`, qs.stringify(editContent), {
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
                                    <strong>Edit Reward Programe</strong >
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
                                    {formik.errors['name'] && (
                                        <>
                                            <strong>{formik.errors['name']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['description'] && (
                                        <>
                                            <strong>{formik.errors['description']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['salePackageObjective'] && (
                                        <>
                                            <strong>{formik.errors['salePackageObjective']}</strong><br />
                                        </>
                                    )}
                                    {formik.errors['objectivePeriodValue'] && (
                                        <>
                                            <strong>{formik.errors['objectivePeriodValue']}</strong><br />
                                        </>
                                    )}

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        placeholder="Enter the name here its requierd"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Package"
                                        variant="outlined"
                                        fullWidth
                                        name="packageId"
                                        value={formik.values.packageId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.packageId && Boolean(formik.errors.packageId)}
                                        helperText={formik.touched.packageId && formik.errors.packageId}
                                    >
                                        {packagesGet.map((pkg) => (
                                            <MenuItem key={pkg.id} value={pkg.id}>
                                                {pkg.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Package"
                                        variant="outlined"
                                        fullWidth
                                        name="voucherTemplateId"
                                        value={formik.values.voucherTemplateId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.voucherTemplateId && Boolean(formik.errors.voucherTemplateId)}
                                        helperText={formik.touched.voucherTemplateId && formik.errors.voucherTemplateId}
                                    >
                                        {voucherTemplateIdGet.map((pkg) => (
                                            <MenuItem key={pkg.id} value={pkg.id}>
                                                {pkg.title}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        label="Sale Package Objective"
                                        variant="outlined"
                                        fullWidth
                                        name="salePackageObjective"
                                        value={formik.values.salePackageObjective}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.salePackageObjective && 
                                            Boolean(formik.errors.salePackageObjective)
                                        }
                                        helperText={
                                            formik.touched.salePackageObjective && 
                                            formik.errors.salePackageObjective
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={6}>
                                    <TextField
                                        label="Objective Period Value"
                                        variant="outlined"
                                        fullWidth
                                        name="objectivePeriodValue"
                                        value={formik.values.objectivePeriodValue}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.objectivePeriodValue && 
                                            Boolean(formik.errors.objectivePeriodValue)
                                        }
                                        helperText={
                                            formik.touched.objectivePeriodValue && 
                                            formik.errors.objectivePeriodValue
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Period Type"
                                        variant="outlined"
                                        fullWidth
                                        name="periodType"
                                        value={formik.values.periodType}
                                        onChange={(e) => handleChangePeriodType(e.target.value)}
                                        error={formik.touched.periodType && Boolean(formik.errors.periodType)}
                                        helperText={formik.touched.periodType && formik.errors.periodType}
                                    >
                                        <MenuItem value="day">Day</MenuItem>
                                        <MenuItem value="month">Month</MenuItem>
                                        <MenuItem value="year">Year</MenuItem>
                                    </TextField>
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

                                <Grid item xs={12} sm={12} md={12}>
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

export default EditRewardProgramModal;
