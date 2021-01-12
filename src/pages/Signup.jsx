import React, { useState, useContext } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Box, Paper, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email as EmailIcon, Lock as LockIcon, Person as PersonIcon } from '@material-ui/icons';
import useStyles from '../style/starterForms';
import AuthAPI from '../api/AuthAPI';
import AuthContext from '../AuthContext';

const validateSignup = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Please keep to a max of 30 characters')
    .required('Field cannot be empty'),
  email: Yup.string()
    .email('Invalid email')
    .required('Field cannot be empty'),
  password: Yup.string()
    .required('Field cannot be empty'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match.')
    .required('Field cannot be empty'),
});

const Signup = () => {
  const { setAuthStatus } = useContext(AuthContext);
  const history = useHistory();
  const inputStyle = {
    backgroundColor: '#fff',
  };
  const classes = useStyles();
  const [error, setError] = useState('');
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.container} elevation={3}>
        <h1 className={classes.heading}>Sign up</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
            name: '',
            repeatPassword: '',
          }}
          validationSchema={validateSignup}
          onSubmit={(values, { setSubmitting }) => {
            const signupAPI = new AuthAPI(values);
            signupAPI.signup(values)
              .then((ret) => {
                if (ret.token) {
                  setError(false);
                  setAuthStatus(true);
                  localStorage.setItem('token', ret.token);
                  history.push('/dashboard');
                } else {
                  setError(ret.toString());
                  setSubmitting(false);
                }
              });
          }}
        >
          {({
            isSubmitting,
            resetForm,
          }) => (
            <Form className={classes.form}>
              <Field
                label="Name"
                component={TextField}
                autoComplete="off"
                variant="outlined"
                InputProps={{
                  style: inputStyle,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                name="name"
                type="text"
                placeholder="Name"
              />
              <Field
                label="Email"
                component={TextField}
                autoComplete="off"
                variant="outlined"
                InputProps={{
                  style: inputStyle,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                name="email"
                type="email"
                placeholder="Email"
              />
              <Field
                label="Password"
                component={TextField}
                autoComplete="off"
                variant="outlined"
                InputProps={{
                  style: inputStyle,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                name="password"
                type="password"
                placeholder="Password"
              />
              <Field
                label="Retype password"
                component={TextField}
                autoComplete="off"
                variant="outlined"
                InputProps={{
                  style: inputStyle,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon className={classes.icon} />
                    </InputAdornment>
                  ),
                }}
                name="repeatPassword"
                type="password"
                placeholder="Retype password"
              />
              <div className={classes.signupButtons}>
                <Button
                  type="submit"
                  className={classes.button}
                  disabled={isSubmitting} // Disable button when form is submitting
                >
                  Sign Up
                </Button>
                <Button
                  type="button"
                  className={classes.button}
                  onClick={resetForm}
                >
                  Clear
                </Button>
              </div>
              {error ? <div className={classes.errorMessage}>{error}</div> : null}
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Signup;
