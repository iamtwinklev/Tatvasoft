import React from 'react'
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import authService from '../../service/auth.service';
import { useAuthContext } from '../../context/auth';

export const Login = () => {
  const navigate = useNavigate();
  const authContext = useAuthContext();
  // const [user, setUser] = useState([]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Please enter your email").email("Please enter a valid email address"),
    password: Yup.string().required("Please enter your password").min(6, "Please make sure you have entered password of atleast 6 letters."),
  });

  const initialValues = {
    // firstname: "",
    // lastname: "",

    email: "",
    password: "",
  };

  const onFormSubmit = (values) => {
    delete values.confirmpassword;
    authService.login(values).then((res) => {
      console.log("res: ", res);
      authContext.setUser(res);
      navigate('/');
      toast.success("Logged in successfully");
    });
    console.log("Values: ", values);
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onFormSubmit}>
          {({ value, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              
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
                <div style={{ display: "flex", marginTop: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: 5,
                      width: "81%",
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

// export default Login;



export default Login
