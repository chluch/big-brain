import React from 'react';
import {
  Box,
  Container,
} from '@material-ui/core/';
import PropTypes from 'prop-types';
import Timer from './Timer';
import useStyles from '../style/activeQuestionCardStyles';
import Youtube from './YoutubePreview';
import Image from './ImageUploadPreview';
import ResponseForm from './ResponseForm';

const imgStyle = {
  width: '100%',
  height: '100%',
  maxWidth: '400px',
  minWidth: '200px',
  maxHeight: 'auto',
  marginBottom: '10px',
};

const ActiveQuestionCard = ({ q, timesUp, setTimesUp }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Container className={classes.questionDisplay}>
        <div className={classes.questionContainer}>
          <div className={classes.imageContainer}>
            {q.image && <Image file={q.image} alt={q.question} style={imgStyle} />}
          </div>
          <div className={classes.media}>
            {q.youtubeLink && <Youtube youtubeUrl={q.youtubeLink} autoplay height="100%" width="100%" />}
          </div>
          <h1 className={classes.question}>{q.question}</h1>
        </div>
      </Container>
      <Container className={classes.answerDisplay}>
        <div className={classes.timerContainer}>
          <Timer question={q} setTimesUp={setTimesUp} />
          <h2 className={classes.points}>{`${q.pointsWorth} Points`}</h2>
        </div>
        <ResponseForm q={q} timesUp={timesUp} />
      </Container>
    </Box>
  );
};

ActiveQuestionCard.propTypes = {
  q: PropTypes.shape({
    questionId: PropTypes.number,
    question: PropTypes.string.isRequired,
    index: PropTypes.number,
    questionType: PropTypes.string.isRequired,
    timeLimit: PropTypes.number.isRequired,
    pointsWorth: PropTypes.number.isRequired,
    image: PropTypes.string,
    youtubeLink: PropTypes.string,
    choices: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }).isRequired,
  timesUp: PropTypes.bool.isRequired,
  setTimesUp: PropTypes.func.isRequired,
};

export default ActiveQuestionCard;
