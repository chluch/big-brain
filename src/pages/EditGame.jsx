import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Grid, Button } from '@material-ui/core/';
import { Edit as EditIcon } from '@material-ui/icons/';
import { TextField } from 'formik-material-ui';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import AddQuestionModal from '../component/AddQuestionModal';
import ManagementAPI from '../api/ManagementAPI';
import putGame from '../api/putGameAPI';
import QuestionCard from '../component/QuestionCard';
import useStyles from '../style/editGameStyles';

const validateGameTitle = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Please keep to a max of 50 characters')
    .required('Game title cannot be empty'),
});

const EditGame = () => {
  const classes = useStyles();
  const { gId } = useParams();
  const history = useHistory();
  const [gameData, setGameData] = useState({});
  const [updateQuestion, setUpdateQuestion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTextfield, setShowTextfield] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    let isCancelled = false;
    const getGameData = async () => {
      const res = await ManagementAPI.getQuiz(gId);
      return res;
    };
    getGameData().then((data) => {
      if (data.toString().match(/TypeError/)) {
        history.push('/error');
        return;
      }
      if (!isCancelled) {
        setGameData(data);
      }
    }).then(() => {
      if (!isCancelled) {
        setLoading(false);
      }
    });
    return () => {
      isCancelled = true; // clean up
    };
  }, [gId, updateQuestion, history]);
  const handleTitleClick = () => {
    setShowTextfield(!showTextfield);
  };
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };
  return (
    <>
      {loading
        ? (
          <div>Fetching Data...</div>
        )
        : (
          <Box className={classes.wrapper}>
            <h1 className={classes.title}>{gameData.name}</h1>
            <div style={{ display: 'flex' }}>
              <Button className={classes.titleButton} onClick={handleTitleClick}>
                <EditIcon />
                Edit game title
              </Button>
              {showTextfield
                ? (
                  <>
                    <Formik
                      initialValues={{
                        title: gameData.name,
                      }}
                      validationSchema={validateGameTitle}
                      onSubmit={(values, { setSubmitting }) => {
                        gameData.name = values.title;
                        putGame(gId, gameData);
                        setGameData(gameData);
                        setSubmitting(false);
                        setShowTextfield(false);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form className={classes.form}>
                          <Field
                            label="Change game title"
                            name="title"
                            component={TextField}
                            autoComplete="off"
                            variant="outlined"
                          />
                          <Button
                            className={classes.submitGameName}
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Submit
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </>
                )
                : null}
            </div>
            <div className={classes.action}>
              <AddQuestionModal
                data={gameData}
                gameId={gId}
                updateStatus={updateQuestion}
                setUpdate={setUpdateQuestion}
              />
              <Button className={classes.editButton} onClick={handleEditClick}>
                <EditIcon />
                Edit Question
              </Button>
            </div>
            <Box className={classes.cardWrapper}>
              <Grid container className={classes.gridContainer} spacing={1}>
                {gameData.questions.map((questions, i) => (
                  <Grid item key={`${i + 1}-container`} xs={12} sm={6} md={4} lg={3}>
                    <QuestionCard
                      questionId={questions.id}
                      name={questions.question}
                      index={i + 1}
                      type={questions.questionType}
                      timeLimit={questions.timeLimit}
                      points={questions.pointsWorth}
                      image={questions.image}
                      youtube={questions.youtubeLink}
                      open={showEdit}
                      updateStatus={updateQuestion}
                      setUpdate={setUpdateQuestion}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
    </>
  );
};

export default EditGame;
