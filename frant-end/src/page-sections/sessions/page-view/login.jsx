import { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled, ButtonBase, Alert, AlertTitle } from "@mui/material";
import myImage from './logo_ottpanel.png';
import Layout from "../Layout";
import { AuthContext } from "@/contexts/jwtContext";
import { LoadingButton } from "@mui/lab";
import './login.css';
const StyledButton = styled(ButtonBase)(({ theme }) => ({
  padding: 12,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`
}));

const LoginPageView = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const { login , isAuthenticated} = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
    remember: true
  };
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().max(255).required("Email is required"),
    password: Yup.string().min(6, "Password should be of minimum 6 characters length").required("Password is required")
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        setIsLoading(true);
        await login(values.email, values.password);
        setAlertError(true);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }}
  });
  return (
    
    <div className="all">
 
    <div className="holder">
    
      <div className="second_part">
      <div className="container">
      {alertError && !isLoading ? <Alert severity="error" >
             <AlertTitle>Error</AlertTitle>
                    There was an error with your user or password. Please try again.
              </Alert> : ""}
    <form className="form login" onSubmit={handleSubmit} >
        <h1>Login</h1>
      <div className="form__field">
        <label htmlFor="login__username">
          <svg className="icon">
            <use xlinkHref="#icon-user"></use>
          </svg>
          <span className="hidden">email</span>
        </label>
        <input
          id="login__username"
          type="text"
          name="email"
          className="form__input"
          placeholder="email"
          value={values.email}
          autoComplete='off'
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
      </div>
      
      {touched.email && errors.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
      <div className="form__field">
        <label htmlFor="login__password">
          <svg className="icon">
            <use xlinkHref="#icon-lock"></use>
          </svg>
          <span className="hidden">Password</span>
        </label>
        <div className='password_'>
        <input
          id="login__password"
          name="password"
          className="form__input"
          placeholder="Password"
          type={passwordVisible ? "text" : "password"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete='off'
          required
        />
        <button type="button" className='check_it' onClick={togglePasswordVisibility}>
                    {passwordVisible ? "Hide" : "See"}
                  </button>
            </div>
      </div>
      {touched.password && errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}

      
                <LoadingButton loading={isLoading} type="submit" className={"btn btn-outline"}>
                  <b>login</b>
              
              </LoadingButton>
      <svg xmlns="http://www.w3.org/2000/svg" className="icons" style={{ display: "none" }}>
        <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
          <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
        </symbol>
        <symbol id="icon-lock" viewBox="0 0 1792 1792">
          <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
        </symbol>
        <symbol id="icon-user" viewBox="0 0 1792 1792">
          <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
        </symbol>
      </svg>
                        </form>
                  </div>
              </div>
         </div>
    </div>
  
  );
  
};

export default LoginPageView;
