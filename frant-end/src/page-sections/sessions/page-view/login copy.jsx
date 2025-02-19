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
            <div className="cover_it">
           
            </div>
            <div className="loginHolder">
              <div className="pic_holder">
              </div>
              <p className='quote_sign'>Let’s Sign You </p>

              <form onSubmit={handleSubmit} className="input_holder">
                
                <input
                  name="email"
                  className='inp'
                  type="text"
                  placeholder='User'
                  value={values.email}
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
                <div className='password_'>
                  <input
                    name="password"
                    className='inpass'
                    type={passwordVisible ? "text" : "password"}
                    placeholder='Password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete='off'
                  />
                  <button type="button" className='check_it' onClick={togglePasswordVisibility}>
                    {passwordVisible ? "Hide" : "See"}
                  </button>
                </div>
                {touched.password && errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
      
                <p className='forgot_pass'>Forgot Password?</p>
                <div className="btn_holder">
                <LoadingButton loading={isLoading} type="submit" className={"btn_submit"}>
                  <b>login</b>
              
              </LoadingButton>
             
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default LoginPageView;
