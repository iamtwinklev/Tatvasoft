import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';
import authService from '../service/auth.service';
// import Header from '../components/Header';

export const Register = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const roleList = [
    { id: 2, name: "buyer" },
    { id: 3, name: "seller" }

  ]

  // useEffect(() => {
  //   // axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
  //   axios.get("https://book-e-sell-node-api.vercel.app/api/user").then((res) => {
  //     console.log("User Details: ", res.data);
  //     setUser(res.data);
  //   });
  // }, []);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your name").min(3, "Please make sure you have entered your name of atleast 3 letters."),
    lastName: Yup.string().required("Please enter your name").min(3, "Please make sure you have entered your name of atleast 3 letters."),
    email: Yup.string().required("Please enter your email").email("Please enter a valid email address"),
    password: Yup.string().required("Please enter your password").min(6, "Please make sure you have entered password of atleast 6 letters."),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
    roleId: Yup.number().required("Role Id is required")

  });

  const initialValues = {
    firstName: "",
    lastName: "",
    roleId: null,
    // name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const onFormSubmit = (values) => {
    console.log("On the form submitted", values);
    delete values.confirmPassword;
    authService.create(values).then((res) => {
      navigate("/login");
      toast.success("Successfully registered");
    })
    // const requestData = {
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   userEmail: values.email, 
    //   roleId: 2,
    //   password: values.password
    // };

    // const res = await axios.post("https://jsonplaceholder.typicode.com/posts", requestData);
    // const res = await axios.post("https://book-e-sell-node-api.vercel.app/api/user", requestData);


    // if (res.status === 201) {
    //   console.log(res.data.id);
    //   // toast("API call is completed successfully")
    //   toast.success("API call is completed successfully", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // }
    // axios.delete("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
    //   if (res.status === 200) {
    //     console.log(res.data.id);
    //     // toast("API call is completed successfully")
    //     toast.success("Data is deleted successfully", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   }
    // })
    // alert("Form Submmited");
  };

  const handleClick = (event) => {
    console.log(123);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <div>
      
      <div>
        <p className='home'>Home {'>'} <Link to="/pages/register">Create Account</Link></p>
      </div>
      <div>
        <h2 className='loginHeading'>Login or Create an Account</h2>
        <hr style={{ width: "100px", marginBottom: "50px" }} />
      </div>
      <div className='container'>
        <h3>Personal Information</h3>
        <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
          {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 5,
                    width: "40%",
                    marginRight: "1%"
                  }}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}

                  />
                  {touched.firstName && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 5,
                    width: "40%"
                  }}
                >
                  <TextField
                    variant="outlined"
                    type="text"
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.lastName && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 5,
                  width: "81%"
                }}
              >
                <TextField
                  variant="outlined"
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div>
                <FormControl style={{width: "80%"}}>
                  <InputLabel>Roles</InputLabel>
                  
                  <Select
                    name="roleId"
                    id={"roleId"}
                    label="Roles"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {roleList.length > 0 &&
                      roleList.map((role) => (

                        <MenuItem value={role.id} key={"name" + role.id}>{role.name}</MenuItem>
                      ))}
                    {/* <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              <h3>Login Information</h3>
              <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 5,
                    width: "40%",
                    marginRight: "1%"
                  }}
                >
                  <TextField
                    variant="outlined"
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {errors.password}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: 5,
                    width: "40%",
                  }}
                >
                  <TextField
                    variant="outlined"
                    type="password"
                    label="confirmPassword"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.confirmPassword && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
              <Button variant="contained" type="submit" style={{ backgroundColor: "red", marginBottom: 10, marginTop: 10 }} className="">
                Submit
              </Button>
            </form>
          )}
        </Formik>

      </div>
      <div>
        {/* {user.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <span>{item.body}</span>
          </div>
        ))} */}
      </div>

    </div>
  )
};

export default Register;