import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Box, Paper, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Person as PersonIcon, VideogameAsset as GameIcon } from '@material-ui/icons';
import useStyles from '../style/joinGameStyles';
import PlayerAPI from '../api/PlayerAPI';

const validateJoinGame = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Please keep to a max of 30 characters')
    .required('Please enter a name'),
  sessionId: Yup.string()
    .matches(/^\d+$/, 'Game session ID should be numbers')
    .required('Please enter game session ID'),
});

const JoinGameForm = ({ setJoin, setPlayerId }) => {
  const { sId } = useParams();
  const classes = useStyles();
  const [error, setError] = useState('');
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.container} elevation={3}>
        <h1 className={classes.heading}>Play a Game</h1>
        <Formik
          initialValues={{
            name: '',
            sessionId: sId || '',
          }}
          validationSchema={validateJoinGame}
          onSubmit={(values, { setSubmitting }) => {
            const Join = new PlayerAPI(values);
            Join.joinGame(values)
              .then((ret) => {
                if (ret.playerId) {
                  setError(false);
                  setPlayerId(ret.playerId);
                  setSubmitting(false);
                  setJoin(true);
                } else {
                  setError(ret.toString());
                  setSubmitting(false);
                }
              });
          }}
        >
          <Form className={classes.form}>
            <Field
              label="Game"
              component={TextField}
              autoComplete="off"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GameIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              name="sessionId"
              type="text"
              placeholder="Enter game ID to join a game"
            />
            <Field
              label="Name"
              component={TextField}
              autoComplete="off"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            <Button type="submit" className={classes.button}>
              Join
            </Button>
            {error ? <div className={classes.errorMessage}>{error}</div> : null}
          </Form>
        </Formik>
      </Paper>
    </Box>
  );
};

JoinGameForm.propTypes = {
  setJoin: PropTypes.func.isRequired,
  setPlayerId: PropTypes.func.isRequired,
};

export default JoinGameForm;
