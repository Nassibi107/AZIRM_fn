import React, { useEffect, useState } from 'react';
import { Grid, Select, MenuItem,FormControl, InputLabel, TextField, Box,Divider, Alert , Button} from '@mui/material';

import { parseISO, addYears, addMonths, addDays, format } from 'date-fns';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Counter } from "@/components/counter";
import qs from 'qs';
const validationSchema = Yup.object({
  packages: Yup.string().required('Package selection is required'),
});

const ModalExpend = ({item, packagesGet, setIsExtend}) => {

  const date_expire = item.expired_at.split(' ')[0];
  const baseDate = parseISO(date_expire);
  let updatedDate = baseDate;

  const [period, setPeriod] = useState(1);
  const [period_type, setPeriod_type] = useState("");

  
  const addToDate = (currentDate, num, type) => {
    let date = new Date(currentDate);
  
    switch (type) {
      case 'day':
        date.setDate(date.getDate() + num);
        break;
      case 'month':
        date.setMonth(date.getMonth() + num);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() + num);
        break;
      default:
        return 'Invalid type';
    }
  
    return date.toISOString().split('T')[0];
  };
  
  async function Extend_Sub(newUseName) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_LV_URL}/m3us/${item.id}/extend`, qs.stringify(newUseName), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Bearer ${Cookies.get("accessToken")}`
            }
        });
    
        
        console.log("Response data:", response.data);
        setIsExtend(false);
    } catch (error) {
        if (error.response && error.response.status === 422) {

            console.log("A 422 error occurred, but it's being handled gracefully.");
        } else {
            
            console.error('An error occurred:', error);
        }
    }
}

const filterTrial = (items) => {
  if (!Array.isArray(items)) {
      console.warn('Expected an array for items, but got:', items);
      return [];
  }

  return items.filter(item => item.is_trial === false);
};

  const [newPack, setNewPack] = useState([]);

  useEffect(() => {
      const filteredItems = filterTrial(packagesGet);
      setNewPack(filteredItems);
  }, [packagesGet]);


  const formattedDate = format(updatedDate, 'yyyy-MM-dd');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [numberConnection, setNumberConnection] = useState(0);
  const [maxConnectionne, setMaxConnectionne] = useState(0);
  const [newDate, setNewDate] = useState("XXXX-XX-XX");

  const handleConnectionChange = (newValue) => {
    if (newValue >= 0 && newValue <= maxConnectionne) {
      setNumberConnection(newValue);
    }
  };

  
  return (
    <>
    <Formik
      initialValues={{ packages: 'pass' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        console.log(selectedPackage);
        console.log("<>",item.id, numberConnection);
        const payload = {
          package_id : values.packages,
          max_connections : numberConnection == 0 ? 1 : numberConnection,
        }
        Extend_Sub(payload);
        
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form>
      <Box sx={{ mb: 4 }}>
        <h1>Extend :</h1>
      <Grid container spacing={4}>
      <Grid item xs={6} sm={4}>
     </Grid>
      <Grid item xs={6} sm={4}>
      <Alert severity="success">Your Credit 82.45</Alert>
     </Grid>
      <Grid item xs={6} sm={4}>
      <Alert severity="warning">Your Rest Credit 81.45</Alert>
     </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="packages"
              name="packages"
              select
              value={values.packages}
              onChange={(event) => {
                setNumberConnection(0);
                const pkgId = event.target.value;
                handleChange(event);
                const pkg = newPack.find(p => p.id === pkgId);
                setSelectedPackage(pkg);
                setPeriod(pkg.period);
                setPeriod_type(pkg.period_type);
                setNewDate(addToDate(date_expire, pkg.period, pkg.period_type));
                setMaxConnectionne(pkg.max_connections);
              }}
              onBlur={handleBlur}
              error={touched.packages && Boolean(errors.packages)}
              helperText={touched.packages && errors.packages}
            >
              <MenuItem value="pass" disabled>
                Select a package...
              </MenuItem>

              {newPack.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.name} || Credit {pkg.credit}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
          <Counter value={numberConnection} setValue={handleConnectionChange} />
            {
                maxConnectionne == 0 ?
                <span style={{fontSize: '0.7rem', marginLeft: '5px'}}>
                    No package choose
                </span>
                :
                <span style={{fontSize: '0.7rem', marginLeft: '5px'}}>Max Connection {maxConnectionne}</span>
            }
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item sx={{ mb: 2 }} xs={12} sm={6}>
            <TextField
              label="Date Issue"
              value={date_expire}
              fullWidth
            />
          </Grid>
          <Grid item sx={{ mb: 2 }} xs={12} sm={6}>
            <TextField
              label="Date Issue"
              value={newDate}
              fullWidth
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mb: 4 }}>
          <Grid item xs={12}>
              <Button type="submit" variant="contained">
                  Save
              </Button>
          </Grid>
        </Box >
      </Box>
      </Form>
      )}
      </Formik>
    </>
  );
};

export default ModalExpend;
