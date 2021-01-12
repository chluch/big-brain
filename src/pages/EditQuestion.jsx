import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { RadioGroup as FormikRadioGroup, TextField, CheckboxWithLabel } from 'formik-material-ui';
import {
  FormControlLabel,
  FormLabel,
  Box,
  Radio,
  Button,
  Slider,
} from '@material-ui/core/';
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
} from 'formik';
import { Backup as UploadIcon } from '@material-ui/icons/';
import * as Yup from 'yup';
import ManagementAPI from '../api/ManagementAPI';
import ImagePreview from '../component/ImageUploadPreview';
import YoutubePreview from '../component/YoutubePreview';
import putGameAPI from '../api/putGameAPI';
import fileToDatUrl from '../util/fileToDataUrl';
import sliderConfig from '../config/sliderConfig';
import useStyles from '../style/questionFormStyles';

const validationSchema = Yup.object().shape({
  question: Yup.string()
    .max(200, 'Please keep your question to 200 characters')
    .required('Please enter a question'),
  youtubeLink: Yup.string()
    .matches(/^(http|https):\/\/www\.youtube\.com*/, 'Please provide a YouTube link'),
  questionType: Yup.string()
    .required('Please choose an option'),
  numberOfChoices: Yup.string()
    .required('You must have at least 2 choices'),
  choices: Yup.array().of(
    Yup.object().shape({
      choice: Yup.string()
        .max(100, 'Please keep your answer to 100 characters')
        .required('You must provide an answer'),
    }),
  ),
  correctAnswer: Yup.string()
    .required('You must choose a correct answer'),
});

const { timerIncrement } = sliderConfig;
const { pointsIncrement } = sliderConfig;

const EditQuestion = () => {
  const classes = useStyles();
  const { gId, qId } = useParams();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState();
  const [gameData, setGameData] = useState();
  const [isSingleChoice, setIsSingleChoice] = useState(true);
  useEffect(() => {
    let isCancelled = false;
    ManagementAPI.getQuiz(gId)
      .then((data) => {
        if (!isCancelled) {
          setGameData(data);
          const qData = (data.questions)
            .filter((question) => question.id === parseInt(qId, 10));
          setInitialValues(qData[0]);
          if (qData[0].questionType === 'multiple-choice-question') {
            setIsSingleChoice(false);
          }
        }
      });
    return () => {
      isCancelled = true; // clean up
    };
  }, [gId, qId]);
  const timerSliderValueText = (value) => `${value}seconds`;
  const pointsSliderValueText = (value) => `${value}points`;
  const handleRadioClick = (e, values, setValues) => {
    if (e.target.value !== 'single-choice-question') {
      const correctAnswer = '';
      setValues({ ...values, correctAnswer });
      setIsSingleChoice(false);
    } else {
      setIsSingleChoice(true);
    }
  };
  const handleImgUpload = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    fileToDatUrl(file)
      .then((url) => {
        setFieldValue('image', url);
      });
  };
  const handleSelectChange = (e, field, values, setValues) => {
    const choices = [...values.choices];
    const numOfChoices = e.target.value || 0;
    const prevNum = parseInt(field.value, 10) || 0;
    if (prevNum < numOfChoices) {
      for (let i = prevNum; i < numOfChoices; i += 1) {
        choices.push({ choice: '' });
      }
    } else {
      for (let i = prevNum; i >= numOfChoices; i -= 1) {
        choices.splice(i, 1);
      }
    }
    setValues({ ...values, choices });
    field.onChange(e);
  };

  return (
    <>
      { initialValues
        ? (
          <Box className={classes.box}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                const toSend = gameData;
                const i = (toSend.questions)
                  .findIndex(((question) => question.id === parseInt(qId, 10)));
                toSend.questions[i] = values;
                putGameAPI(gId, toSend);
                setSubmitting(false);
                history.goBack();
              }}
            >
              {({
                isSubmitting,
                values,
                setFieldValue,
                setValues,
              }) => (
                <Form>
                  <Field
                    label="Enter your question"
                    component={TextField}
                    autoComplete="off"
                    variant="outlined"
                    name="question"
                    aria-label="question-description"
                    type="text"
                    multiline
                    rows={2}
                    fullWidth
                  />
                  <div className={classes.uploadAction}>
                    <ImagePreview
                      file={values.image}
                      alt={values.image.name}
                      style={{ width: '100%', maxWidth: '350px', marginBottom: '10px' }}
                    />
                    <div className={classes.actionButtons}>
                      <Button aria-label="upload-image" component="label" className={classes.uploadImgButton}>
                        <UploadIcon fontSize="small" />
                        Upload Image (Optional)
                        <input
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImgUpload(e, setFieldValue)}
                          style={{ display: 'none' }}
                        />
                      </Button>
                      <Button
                        aria-label="remove-image"
                        onClick={() => { setFieldValue('image', ''); }}
                        className={classes.removeImgButton}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                  <div className={classes.uploadAction}>
                    <YoutubePreview youtubeUrl={values.youtubeLink} width="400" height="225" />
                    <Field
                      label="Provide a YouTube link (Optional)"
                      component={TextField}
                      autoComplete="off"
                      variant="outlined"
                      name="youtubeLink"
                      aria-label="attach-youtube-link"
                      type="text"
                      fullWidth
                      className={classes.youtubeInput}
                    />
                  </div>
                  <FormLabel component="legend" className={classes.label}>
                    Question Type
                  </FormLabel>
                  <Field
                    component={FormikRadioGroup}
                    name="questionType"
                    aria-label="select-question-type"
                    onClick={(e) => handleRadioClick(e, values, setValues)}
                    className={classes.radio}
                  >
                    <FormControlLabel
                      value="single-choice-question"
                      label="Single Choice Question"
                      control={<Radio disabled={isSubmitting} />}
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value="multiple-choice-question"
                      label="Multiple Choice Question"
                      control={<Radio disabled={isSubmitting} />}
                      disabled={isSubmitting}
                    />
                  </Field>
                  <div className={classes.caption}>Set time limit (seconds):</div>
                  <Slider
                    name="timeLimit"
                    defaultValue={10}
                    step={null}
                    marks={timerIncrement}
                    max={120}
                    valueLabelDisplay="auto"
                    getAriaValueText={timerSliderValueText}
                    aria-labelledby="timer-slider"
                    value={values.timeLimit}
                    onChange={(e, value) => setFieldValue('timeLimit', value)}
                  />
                  <div className={classes.caption}>Set Points:</div>
                  <Slider
                    name="pointsWorth"
                    defaultValue={100}
                    step={null}
                    marks={pointsIncrement}
                    max={1000}
                    valueLabelDisplay="auto"
                    getAriaValueText={pointsSliderValueText}
                    aria-labelledby="points-slider"
                    value={values.pointsWorth}
                    onChange={(e, value) => setFieldValue('pointsWorth', value)}
                    className={classes.points}
                  />
                  <label htmlFor="number-of-choices">
                    Number of answer choices:
                    <Field name="numberOfChoices" id="number-of-choices">
                      {({ field }) => (
                        <>
                          <select
                            className={classes.dropdown}
                            value={field.value}
                            name={field.name}
                            onChange={(e) => handleSelectChange(e, field, values, setValues)}
                          >
                            <option value="" label=" " />
                            {[2, 3, 4, 5, 6].map((i) => <option key={i} value={i}>{i}</option>)}
                          </select>
                          <ErrorMessage name="numberOfChoices" />
                        </>
                      )}
                    </Field>
                  </label>
                  <div className={classes.choicesWrapper}>
                    <div className={classes.choicesContainer}>
                      <FieldArray name="choices">
                        {() => (values.choices.map((choice, i) => {
                          const key1 = `choice-${i}`;
                          return (
                            <Field
                              key={key1}
                              component={TextField}
                              label={`Choice ${i + 1}`}
                              name={`choices.${i}.choice`}
                              aria-label={`choice-${i + 1}-description`}
                              variant="outlined"
                              type="text"
                              autoComplete="off"
                            />
                          );
                        }))}
                      </FieldArray>
                    </div>
                    <div className={classes.checklist}>
                      {isSingleChoice
                        ? (
                          <Field
                            component={FormikRadioGroup}
                            name="correctAnswer"
                            aria-label="correct-answer"
                          >
                            {values.choices.map((choice, i) => {
                              const key = `answer-${i}`;
                              return (
                                <FormControlLabel
                                  key={key}
                                  value={`choice-${i}`}
                                  label={`Mark ${i + 1} as correct`}
                                  control={<Radio disabled={isSubmitting} />}
                                  disabled={isSubmitting}
                                  className={classes.choicesRadio}
                                />
                              );
                            })}
                          </Field>
                        )
                        : (
                          <>
                            {values.choices.map((choice, i) => {
                              const key = `answer-${i}`;
                              return (
                                <Field
                                  key={key}
                                  component={CheckboxWithLabel}
                                  type="checkbox"
                                  name="correctAnswer"
                                  value={`choice-${i}`}
                                  Label={{ label: `Mark ${i + 1} as correct` }}
                                  className={classes.choicesCheckbox}
                                />
                              );
                            })}
                          </>
                        )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    aria-label="submit-edit-question-form"
                    disabled={isSubmitting}
                    className={classes.submit}
                  >
                    Update Question
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        )
        : <div>Fetching data...</div>}
    </>
  );
};

export default EditQuestion;
