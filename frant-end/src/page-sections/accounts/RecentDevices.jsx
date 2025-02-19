import { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Typography, Button, Select, MenuItem, Grid, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { H6 } from "@/components/typography"; // STYLED COMPONENT
import Lightp from '../../icons/Lightp';
import Pac from '../../icons/Pac';
import Tem from '../../icons/Tem';
import { Add, Api, Key, KeyboardArrowDown } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from 'formik';
import ApiService from "../../Api/DashApi";
import CradModel from '@/__fakeData__/Model/CardModel';

const AddCart = ({ onCancel }) => {
    const ft_close = () => {
        onCancel(false);
    };
    const m = {
        margin: '15px'
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required!"),
        type: Yup.string().required("Type is required!"),
        pack: Yup.string().required("Pack Title is required!"),
    });

    // Initial values for the form fields
    const initialValues = {
        name: "",
        pack: "M3U",
        type: "Pack migration",
    };

    // Formik form handling
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: () => {
            const NewCard = new CradModel(values.name, values.pack, values.type);
            ApiService.card.create(NewCard).then(alert("create is done")).then(window.location.reload());
        },
    });

    const d1 = [
        "M3U", "MAG", "Enigma", "Active Code"
    ];

    const d2 = [
        "Pack migration", "Trail", "Paid Trial 12h",
        "Active Code", "Test pack", "1 Month", "3 Month",
        "6 Month", "1 Year", "2 Year"
    ];

    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <TextField
                        name='name'
                        label='Name'
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        helperText={touched.name && errors.name}
                        error={Boolean(touched.name && errors.name)}
                        SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDown,
                        }}
                    />
                    <Divider style={m} />
                    <TextField
                        select
                        fullWidth
                        onChange={handleChange}
                        name="type"
                        value={values.type}
                        helperText={touched.type && errors.type}
                        error={Boolean(touched.type && errors.type)}
                        SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDown,
                        }}
                    >
                        {d1.map(item => <option value={item} key={item}>{item}</option>)}
                    </TextField>
                    <Divider style={m} />
                    <TextField
                        select
                        fullWidth
                        onChange={handleChange}
                        name="pack"
                        value={values.pack}
                        helperText={touched.pack && errors.pack}
                        error={Boolean(touched.pack && errors.pack)}
                        SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDown,
                        }}
                    >
                        {d2.map(item => <option value={item} key={item}>{item}</option>)}
                    </TextField>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSubmit}>Save</Button>
                    <Button size="small" onClick={ft_close}>Cancel</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const RecentDevices = () => {
    const [editIndex, setEditIndex] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        pack: ''
    });

    useEffect(() => {
        (async () => {
            const data = await ApiService.card.getAll();
            setCards(data);
        })();
    }, []);

    const [deleteIndex, setDeleteIndex] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [par , setPar] = useState(null);

    const handleEditClick = (index) => {
        setEditIndex(index);
        setFormData(cards[index]);
    };

    const handleSaveClick = (id) => {
        const updatedCards = [...cards];
        updatedCards[editIndex] = formData;
        const { name, type, pack } = formData;
        const NewCard = new CradModel(name, type, pack);
        ApiService.card.update(id, NewCard).then(alert(`edit is done ${id}`)).then(window.location.reload())
        setFormData(cards[editIndex]);
        setCards(updatedCards);
        setEditIndex(null);
    };

    const handleCancelClick = () => {
        setEditIndex(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDeleteClick = (index) => {
        setDeleteIndex(index);
        setPar(index);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        ApiService.card.delete(par).then(alert("delete  done !!")).then(window.location.reload());
        setOpenDialog(false);
    };

    const createCard = () => {
        setOpenAdd(true);
    };

    const cardElements = cards.map((card, index) => (
        <Grid item xs={6} key={index}>
          <Card>
            <CardContent>
              {editIndex === index ? (
                <>
                  <TextField
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <Select
                    name="type"
                    label="Type"
                    value={formData.type}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Type
                    </MenuItem>
                    <MenuItem value="M3U">M3U</MenuItem>
                    <MenuItem value="MAG">MAG</MenuItem>
                    <MenuItem value="Enigma">Enigma</MenuItem>
                    <MenuItem value="Active Code">Active Code</MenuItem>
                  </Select>
      
                  <Select
                    name="pack"
                    label="Pack"
                    value={formData.pack}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select Pack
                    </MenuItem>
                    <MenuItem value="Pack migration">Pack migration</MenuItem>
                    <MenuItem value="Trail">Trail</MenuItem>
                    <MenuItem value="Paid Trial 12h">Paid Trial 12h</MenuItem>
                    <MenuItem value="Active Code">Active Code</MenuItem>
                    <MenuItem value="Test pack">Test pack</MenuItem>
                    <MenuItem value="1 Month">1 Month</MenuItem>
                    <MenuItem value="3 Month">3 Month</MenuItem>
                    <MenuItem value="6 Month">6 Month</MenuItem>
                    <MenuItem value="1 Year">1 Year</MenuItem>
                    <MenuItem value="2 Year">2 Year</MenuItem>
                  </Select>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="h2">
                    <Lightp /> {card.name}
                  </Typography>
                  <Typography color="textSecondary">
                    <Pac /> {card.type}
                  </Typography>
                  <Typography>
                    <Tem /> Template: {card.pack}
                  </Typography>
                </>
              )}
            </CardContent>
            <CardActions>
              {editIndex === index ? (
                <>
                  <Button size="small" onClick={() => handleSaveClick(card.id)}>Save</Button>
                  <Button size="small" onClick={handleCancelClick}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button size="small" onClick={() => handleEditClick(index)}>Edit</Button>
                  <Button size="small" color="secondary" onClick={() => handleDeleteClick(card.id)}>Delete</Button>
                </>
              )}
            </CardActions>
          </Card>
        </Grid>
      ));

    const m = {
        margin: '10px'
    };

    return (
        <>
            <Divider style={m} />
            <H6 fontSize={14} p={3}>
                Quick
            </H6>
            <Divider style={m} />
            {!openAdd ? (
                <Button type="button" sx={{ mx: 1 }} onClick={createCard}><Add /></Button>
            ) : (
                <AddCart onCancel={v => setOpenAdd(v)} />
            )}
            <Grid container style={m} spacing={3}>
                {cardElements}
            </Grid>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this card?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RecentDevices;
