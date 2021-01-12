import React, { useContext, useEffect } from 'react';
import {
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core/';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Formik, Form, Field, useFormikContext,
} from 'formik';
import { RadioGroup as FormikRadioGroup, CheckboxWithLabel } from 'formik-material-ui';
import PropTypes from 'prop-types';
import useStyles from '../style/activeQuestionCardStyles';
import putAnswer from '../api/putAnswerAPI';
import PlayerContext from '../PlayerContext';

const theme = createMuiTheme();
theme.typography.h5 = {
  fontSize: '1.2rem',
  '@media (max-width: 450px)': {
    fontSize: '1rem',
  },
};

const ResponseForm = ({ q, timesUp }) => {
  const classes = useStyles();
  const { playerId } = useContext(PlayerContext);

  // The answer shall be sent to the server the moment the user starts making selections.
  // If further selections are modified, more requests are sent
  const AutoSubmit = () => {
    const { values, submitForm, resetForm } = useFormikContext();
    useEffect(() => {
      let isCancelled = false;
      if (!isCancelled) {
        submitForm();
        if (timesUp) {
          submitForm();
          resetForm();
        }
      }
      return () => {
        isCancelled = true; // clean up
      };
    }, [values, submitForm, resetForm]);
    return null;
  };

  let isSingleChoice = true;
  if (q.questionType === 'multiple-choice-question') {
    isSingleChoice = false;
  }
  return (
    <Formik
      initialValues={{ answerIds: '' }}
      onSubmit={(values) => {
        if (isSingleChoice) {
          const answerArr = [];
          answerArr.push(values.answerIds);
          const toSend = { answerIds: answerArr };
          putAnswer(toSend, playerId);
        } else {
          putAnswer(values, playerId);
        }
      }}
    >
      {({
        values, submitForm,
      }) => (
        <ThemeProvider theme={theme}>
          <Form className={classes.form}>
            {isSingleChoice
              ? (
                <Field
                  component={FormikRadioGroup}
                  name="answerIds"
                  aria-label="choose-answer"
                >
                  {q.choices.map((object, i) => {
                    const key = `answer-${i}`;
                    return (
                      <FormControlLabel
                        key={key}
                        value={`choice-${i}`}
                        label={<Typography variant="h5">{object.choice}</Typography>}
                        control={<Radio disabled={timesUp} />}
                        disabled={timesUp}
                      />
                    );
                  })}
                </Field>
              )
              : (
                <>
                  {q.choices.map((object, i) => {
                    const key = `answer-${i}`;
                    return (
                      <Field
                        key={key}
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="answerIds"
                        aria-label="choose-answer"
                        value={`choice-${i}`}
                        Label={{ label: <Typography variant="h5">{object.choice}</Typography> }}
                        className={classes.checkbox}
                        disabled={timesUp}
                      />
                    );
                  })}
                </>
              )}
            <AutoSubmit values={values} submitForm={submitForm} />
          </Form>
        </ThemeProvider>
      )}
    </Formik>
  );
};

ResponseForm.propTypes = {
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
};

export default ResponseForm;
