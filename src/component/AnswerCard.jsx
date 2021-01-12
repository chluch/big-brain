import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  makeStyles,
} from '@material-ui/core/';
import formatAnswer from '../util/formatAnswer';

const useStyles = makeStyles({
  wrapper: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    boxSizing: 'border-box',
  },
  answerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    border: '5px solid #55a1e5',
  },
  title: {
    margin: 0,
    padding: '10px 10px 5px 10px',
    fontSize: '24px',
  },
  answerText: {
    margin: '10px 0 10px 10px',
    fontSize: '18px',
    wordWrap: 'break-word',
  },
});

const AnswerCard = ({ q }) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Container className={classes.answerContainer}>
        <h1 className={classes.title}>Answer Reveal!</h1>
        <p className={classes.answerText}>{formatAnswer(q)}</p>
      </Container>
    </Box>
  );
};

AnswerCard.propTypes = {
  q: PropTypes.shape({
    questionType: PropTypes.string.isRequired,
    choices: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    correctAnswer: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  }).isRequired,
};

export default AnswerCard;
