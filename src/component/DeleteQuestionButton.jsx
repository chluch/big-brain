import React from 'react';
import { Button, makeStyles } from '@material-ui/core/';
import { DeleteForever as DeleteIcon } from '@material-ui/icons/';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import putGameAPI from '../api/putGameAPI';

const useStyles = makeStyles({
  button: {
    fontSize: '14px',
    '&:hover': {
      color: 'red',
      backgroundColor: '#ddd',
    },
  },
});

const DeleteQuestionButton = ({ questionId, updateStatus, setUpdate }) => {
  const { gId } = useParams();
  const classes = useStyles();
  const handleClick = () => {
    ManagementAPI.getQuiz(gId)
      .then((data) => {
        const toSend = data;
        const newQuestions = (data.questions).filter((question) => question.id !== questionId);
        toSend.questions = newQuestions;
        putGameAPI(gId, toSend)
          .then(setUpdate(!updateStatus));
      });
  };
  return (
    <Button
      className={classes.button}
      onClick={handleClick}
      aria-label="delete-question"
    >
      <DeleteIcon fontSize="small" />
      Delete
    </Button>
  );
};

DeleteQuestionButton.propTypes = {
  questionId: PropTypes.number.isRequired,
  updateStatus: PropTypes.bool.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default DeleteQuestionButton;
