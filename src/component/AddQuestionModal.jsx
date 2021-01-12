import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Modal,
  IconButton,
  Button,
} from '@material-ui/core/';
import { NoteAdd as AddQuestionIcon, Close as CloseIcon } from '@material-ui/icons/';
import PropTypes from 'prop-types';
import QuestionForm from './QuestionForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    position: 'absolute',
    top: '17%',
    margin: 'auto',
    width: '600px',
    height: '70%',
    backgroundColor: '#007788',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    display: 'flex',
    '@media (max-width:600px)': {
      top: '15%',
      width: '80vw',
    },
  },
  paper: {
    padding: theme.spacing(3),
    margin: '0',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'auto',
  },
  closeIcon: {
    float: 'right',
    margin: '-12px',
  },
  heading: {
    margin: '0 0 30px 0',
    fontSize: '35px',
    boxShadow: '0 4px 5px -5px #007799',
  },
  button: {
    color: '#000000',
    backgroundColor: '#99eebb',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '165px',
    height: '40px',
    margin: '10px',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
    '@media (max-width: 395px)': {
      fontSize: '10px',
      width: 'auto',
    },
  },
}));

const AddQuestionModal = ({
  data,
  gameId,
  updateStatus,
  setUpdate,
}) => {
  const classes = useStyles();
  // State for Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Modal Content
  const body = (
    <Box className={classes.modalBody}>
      <Paper className={classes.paper} elevation={3}>
        <IconButton
          onClick={handleClose}
          aria-label="close-add-question-modal"
          className={classes.closeIcon}
        >
          <CloseIcon />
        </IconButton>
        <h1 className={classes.heading} id="add-question-modal-title">Add Question</h1>
        <QuestionForm
          closeModal={handleClose}
          data={data}
          gameId={gameId}
          updateStatus={updateStatus}
          setUpdate={setUpdate}
        />
      </Paper>
    </Box>
  );

  // TODO:
  // 1. style when done with form and API (at least make sure responsive)

  return (
    <div>
      <Button
        type="button"
        className={classes.button}
        onClick={handleOpen}
        aria-label="add-game"
      >
        <AddQuestionIcon />
        Add Question
      </Button>
      <Modal
        disableBackdropClick
        className={classes.modal}
        open={open}
        aria-labelledby="add-question-modal-title"
        aria-describedby="add-question-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

AddQuestionModal.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }),
  gameId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  updateStatus: PropTypes.bool.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

AddQuestionModal.defaultProps = {
  data: null,
};

export default AddQuestionModal;
