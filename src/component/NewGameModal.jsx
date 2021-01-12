import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { TextField } from 'formik-material-ui';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import Management from '../api/ManagementAPI';

// Used material ui example
function getModalStyle() {
  return {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  createGameButton: {
    margin: '5px 0',
    backgroundColor: '#21ada8',
    border: 'none',
    fontWeight: 'bold',
    color: '#000',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
  },
}));

export default function NewGameModal({ setGames }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateGameTitle = Yup.object().shape({
    title: Yup.string()
      .max(50, 'Please keep to a max of 50 characters')
      .required('Game title cannot be empty'),
  });

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="new-game-modal-title">Create a new game!</h2>
      <Formik
        id="formik"
        initialValues={{ title: '' }}
        validationSchema={validateGameTitle}
        onSubmit={(values) => {
          const gameTitle = values.title;
          Management.newGame(gameTitle)
            .then((ret) => {
              setGames([ret]);
              setOpen(false);
            });
        }}
      >
        <Form>
          <Field
            label="Game Name"
            name="title"
            component={TextField}
            autoComplete="off"
            variant="outlined"
            fullWidth
          />
          <Button
            id="submitNewGame"
            className={classes.createGameButton}
            type="submit"
            aria-label="create-game"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );

  return (
    <div>
      <Button
        className={classes.createGameButton}
        id="createGameButton"
        variant="contained"
        color="primary"
        type="button"
        disableElevation
        onClick={handleOpen}
      >
        Create Game!
      </Button>
      <Modal
        id="gameModal"
        open={open}
        onClose={handleClose}
        aria-labelledby="create-new-game"
        aria-describedby="create-new-game"
      >
        {body}
      </Modal>
    </div>
  );
}

NewGameModal.propTypes = {
  setGames: PropTypes.func.isRequired,
};
