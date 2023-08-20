import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
// import TextField from '@mui/material/TextField';
import { Avatar, Popover, Button, TextField } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { Formik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { toast } from 'react-toastify';

export const Apple = () => {
    // const [name, setName] = useState('');
    // Predefine value
    // const [name, setName] = useState('Misari');
    // const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const Navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        /*console.log('The new value of name : ', name);
        return () => {
            console.log('The old value of name : ', name);
        };*/

        axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
            console.log('User detail: ', res.data)
            setUser(res.data);
        })

    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Please make sure yoou have entered you name with atleast 3 char.').required('Please enter your name'),
        email: Yup.string().email('Please enter a valid email address.').required('Please enter email address')
    });
    const initialValues = {
        name: "",
        email: "",
    }

    const onFormSubmit = async (values) => {
        // Navigate('/');
        // alert('This button has been clicked');

        // console.log('Button Clicked.')
        // console.log('Name : ', name)
        // console.log('Email : ', email)
        console.log('On the form submitted', values)
        // alert('Form submitted')
        // Navigate('/');

        const requiredData = {
            userName: values.name,
            userEmail: values.email
        }
        // call API to post submit the form
        const res = await axios.post("https://jsonplaceholder.typicode.com/posts", requiredData);

        if (res.status === 201) {
            console.log(res.data.id);
            toast.success('API call is completted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        axios.delete("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
            if (res.status === 200) {
                console.log(res.data.id);
                toast.success('Data is deleted successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        })
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <div style={{ padding: 5 }}>
            {/* <div>Apple Page 🍎</div> */}
            <div style={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", columnGap: 5 }} onClick={handleClick}>
                    <Avatar sx={{ bgcolor: "purple" }}>TV</Avatar>
                    <span>Misari Gami</span>
                </div>
            </div>
            <div style={{ padding: 5, display: "flex", flexDirection: "column", rowGap: 10, width: '30%', marginLeft: '30%' }}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
                    {({ value, errors, touched, handleSubmit, handleBlur, handleChange }) => (
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: "flex", flexDirection: 'column', marginBottom: 5 }}>
                                <TextField variant="outlined" label='Name' type='text' name='name' id='name' placeholder="Name" onChange={handleChange} onBlur={handleBlur} />
                                {touched.name && (<span style={{ padding: 5, color: "red", fontSize: 16, fontWeight: 500 }}>{errors.name}</span>)}
                            </div>
                            <div style={{ display: "flex", flexDirection: 'column', marginBottom: 5 }}>
                                <TextField variant="outlined" label='Email' type='email' name='email' id="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} />
                                {touched.email && (<span style={{ padding: 5, color: "red", fontSize: 16, fontWeight: 500 }}>{errors.email}</span>)}
                            </div>


                            {/* <button onClick={onHomePageButtonClick}>Navigate to Home Page</button> */}
                            <Button variant="contained" type="submit" >Submit</Button>
                        </form>
                    )}
                </Formik>
            </div>

            {/*<Popover
                open={open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <div style={{ padding: 5 }}>
                    <Button variant="contained" onClick={onHomePageButtonClick}><LogoutIcon /></Button>
                </div>
            </Popover>*/}
            <div>
                {user.map((item) => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <span>{item.body}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Apple