import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import { H6 } from "@/components/typography";
import FlexBox from "@/components/flexbox/FlexBox"; // ==================================================================

// ==================================================================
const TodoForm = ({
  show,
  handleClose,
  title,
  handleOpen
}) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, "Too Short").required("Title is Required!"),
    date: Yup.date().required("Date is Required!"),
    description: Yup.string().min(10, "Too Short").required("Description is Required!")
  });
  const initialValues = {
    title: "",
    date: "",
    description: "",
    mentionClient: "",
    statusColor: "#61A9FF"
  };
  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      handleClose();
      console.log(values);
    }
  });
  return <Box padding="2rem">

      <Button fullWidth variant="contained" onClick={handleOpen} sx={{
      my: "1rem",
      display: show ? "none" : "auto"
    }}>
        <Add />
      </Button>

      <form onSubmit={handleSubmit}>
        <Box sx={{
        marginTop: 2,
        display: show ? "auto" : "none"
      }}>
          <Stack spacing={1}>
            <TextField fullWidth size="small" name="name" placeholder="name" value={values.title} onChange={handleChange} helperText={touched.title && errors.title} error={Boolean(touched.title && errors.title)} />
            <FlexBox alignItems="center">
              <FormLabel component="small" sx={{
              color: "text.secondary"
            }}>
              </FormLabel>
              <TextField fullWidth select label="Status">
                <MenuItem value="1">all</MenuItem>
                <MenuItem value="2">in progrem </MenuItem>
                <MenuItem value="3">Deleted</MenuItem>
                <MenuItem value="4">ticket</MenuItem>
              </TextField>
            </FlexBox>
            <FlexBox alignItems="center">
              <FormLabel component="small" sx={{
              color: "text.secondary"
            }}>
              </FormLabel>
              <TextField fullWidth select label="Status">
                <MenuItem value="1">all</MenuItem>
                <MenuItem value="2">in progrem </MenuItem>
                <MenuItem value="3">Deleted</MenuItem>
                <MenuItem value="4">ticket</MenuItem>
              </TextField>
            </FlexBox>
            <FlexBox alignItems="center">
              <FormLabel component="small" sx={{
              color: "text.secondary"
            }}> 
            </FormLabel>
              <TextField fullWidth select label="Status">
                <MenuItem value="1">all</MenuItem>
                <MenuItem value="2">in progrem </MenuItem>
                <MenuItem value="3">Deleted</MenuItem>
                <MenuItem value="4">ticket</MenuItem>
              </TextField>
            </FlexBox>
          </Stack>
          <FlexBox gap={2} mt={2}>
            <Button fullWidth type="submit">
              Save
            </Button>
            <Button fullWidth color="secondary" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </FlexBox>
        </Box>
      </form>
    </Box>;
};

export default TodoForm;