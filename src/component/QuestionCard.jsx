import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core/';
import {
  Star as StarIcon,
  Timer as TimerIcon,
} from '@material-ui/icons/';
import PropTypes from 'prop-types';
import imgPlaceholder from '../assets/questionImagePlaceholder.png';
import YoutubePreview from './YoutubePreview';
import DeleteQuestionButton from './DeleteQuestionButton';
import EditQuestionButton from './EditQuestionButton';
import useStyles from '../style/questionCardStyles';

const QuestionCard = ({
  questionId,
  name,
  index,
  type,
  timeLimit,
  points,
  image,
  youtube,
  open,
  updateStatus,
  setUpdate,
}) => {
  const classes = useStyles();
  const questionType = type.replace(/-/g, ' ');
  return (
    <Card
      className={classes.card}
    >
      <div className={classes.uploadContainer}>
        {youtube ? <YoutubePreview youtubeUrl={youtube} className="youtube-preview" /> : <img className={classes.img} src={image || imgPlaceholder} alt={`question ${index}`} />}
      </div>
      <CardContent className={classes.cardContent}>
        <div className={classes.questionDescription}>
          <h1 className={classes.title}>{`Question ${index}`}</h1>
          <p className={`question-description ${classes.question}`}>{name}</p>
        </div>
        <ul className={classes.list}>
          <li className="question-type">
            {questionType}
          </li>
          <li>
            <StarIcon className={classes.icon} fontSize="small" />
            <span className={classes.gameInfoTitle}>Points: </span>
            <span className={`points ${classes.gameInfo}`}>{points}</span>
          </li>
          <li>
            <TimerIcon className={classes.icon} fontSize="small" />
            <span className={classes.gameInfoTitle}>Time Limit: </span>
            <span className={`time-limit ${classes.gameInfo}`}>{`${timeLimit}sec`}</span>
          </li>
        </ul>
      </CardContent>
      {open ? (
        <CardActions className={classes.cardActions}>
          <DeleteQuestionButton
            className="delete-question-btn"
            questionId={questionId}
            updateStatus={updateStatus}
            setUpdate={setUpdate}
          />
          <EditQuestionButton
            className="edit-question-btn"
            qId={questionId}
          />
        </CardActions>
      )
        : null}
    </Card>
  );
};

QuestionCard.propTypes = {
  questionId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  timeLimit: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  image: PropTypes.string,
  youtube: PropTypes.string,
  open: PropTypes.bool.isRequired,
  updateStatus: PropTypes.bool.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

QuestionCard.defaultProps = {
  image: '',
  youtube: '',
};

export default QuestionCard;
