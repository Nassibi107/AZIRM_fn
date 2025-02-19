import { useState } from 'react';
import './Login.css'
import myImage from './logo_ottpanel.png';
import * as yup from "yup"
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const formSchema = yup.object({
  userName: yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .matches(/^[A-Za-z]+$/, "Username should not contain numbers"),
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
});

const LogIn = () => {

  const navigate = useNavigate();

  // const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
  //   initialValues: {
  //     userName: '',
  //     password: ''
  //   },
  //   validationSchema: formSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //     resetForm();
  //   },
  // });

    const { values, errors, touched, handleChange, handleSubmit, resetForm } = useFormik({
      initialValues: {
        userName: '',
        password: ''
      },
      validationSchema: formSchema,
      onSubmit: async (values) => {
        try {
          const response = await fetch('./users.json');
          const users = await response.json();
          const userExists = users.some(user => user.username === values.userName && user.password === values.password);
          if (userExists) {
            alert('Login successful!');
            navigate('/');
          } else {users
            alert('Invalid username or password.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          alert('An error occurred while logging in. Please try again later.');
        }
        resetForm();
      },
    });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="all">
      <div className="holder">
        <div className="first_part">
          <div className="overlay">
            <div className="topPart">
              <div className="holder_descript">
                <p className='title_descript'>Special edition</p>
                <p className='description'>Here you can find the latest offer</p>
              </div>
            </div>
            <div className="BottomPart">
              <div className="holder_bottom">
                <p className="welcome">Welcome</p>
                <p className="quote">Good to see you</p>
              </div>
            </div>
          </div>
        </div>
        <div className="second_part">
          <div className="cover_it">
            <div className="box_over"></div>
          </div>
          <div className="loginHolder">
            <div className="pic_holder">
              <img src={myImage} className='pic_logo' alt="Description" />
            </div>
            <p className='quote_sign'>Let’s Sign You In</p>
            <div className="input_holder">
              <input
                name="userName"
                className='inp'
                type="text"
                placeholder='UserName'
                value={values.userName}
                autoComplete='off'
                onChange={handleChange}
              />
              {touched.userName && errors.userName ? (
                <div className="error">{errors.userName}</div>
              ) : null}

              <div className='password_'>
                <input
                  name="password"
                  className='inpass'
                  type={passwordVisible ? "text" : "password"}
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  autoComplete='off'
                />
                <button type="button" className='check_it' onClick={togglePasswordVisibility}>
                  {passwordVisible ? "Hide" : "See"}
                </button>
              </div>
              {touched.password && errors.password ? (
                <div className="error">{errors.password}</div>
              ) : null}
            </div>
            <p className='forgot_pass'>Forgot Password?</p>
            <div className="btn_holder">
              <button className='btn_submit' onClick={handleSubmit}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn;
