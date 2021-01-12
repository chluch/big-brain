import React, { useContext, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { Box, Paper, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email as EmailIcon, Lock as LockIcon } from '@material-ui/icons';
import useStyles from '../style/starterForms';
import AuthAPI from '../api/AuthAPI';
import AuthContext from '../AuthContext';

const validateLogin = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Field cannot be empty'),
  password: Yup.string()
    .required('Field cannot be empty'),
});

const Login = () => {
  const classes = useStyles();
  const { setAuthStatus } = useContext(AuthContext);
  const [error, setError] = useState('');
  const history = useHistory();
  const inputStyle = {
    backgroundColor: '#fff',
  };
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.container} elevation={3}>
        <h1 className={classes.heading}>Log in</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validateLogin}
          onSubmit={(values, { setSubmitting }) => {
            const loginAPI = new AuthAPI(values);
            loginAPI.login(values)
              .then((ret) => {
                if (ret.token) {
                  localStorage.setItem('token', ret.token);
                  setAuthStatus(true);
                  history.push('/dashboard');
                } else {
                  setSubmitting(false);
                  setError(ret.toString());
                }
              });
          }}
        >
          <Form className={classes.form}>
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
            />
            <Button
              type="submit"
              className={classes.button}
            >
              Log In
            </Button>
            {error ? <div className={classes.errorMessage}>{error}</div> : null}
          </Form>
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;
