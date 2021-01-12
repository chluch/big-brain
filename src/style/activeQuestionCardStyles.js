import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles({
  wrapper: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    boxSizing: 'border-box',
  },
  questionDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0',
    border: '5px solid #ed6e85',
  },
  timerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    marginTop: 'auto',
    marginRight: '10px',
    textAlign: 'center',
  },
  questionContainer: {
    width: '100%',
    // border: '15px solid gold',
    backgroundColor: 'white',
    wordBreak: 'break-word',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  question: {
    margin: '0',
    padding: '10px',
    fontSize: '24px',
  },
  media: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'gold',
  },
  imageContainer: {
    margin: '5px 5px 0 5px',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'gold',
  },
  points: {
    margin: '0',
  },
  answerDisplay: {
    // border: '10px solid #52307c',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    wordBreak: 'break-word',
    paddingRight: '100px',
    '@media (max-width:530px)': {
      paddingRight: '0',
    },
  },
  checkbox: {
    '& .MuiFormControlLabel-root': {
      display: 'block',
    },
  },
  answerTitle: {
    margin: '0',
  },
  answer: {
    margin: '0 0 20px 0',
  },
});

export default useStyles;
