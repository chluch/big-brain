import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Grid, makeStyles } from '@material-ui/core/';
import NewGameModal from '../component/NewGameModal';
import Management from '../api/ManagementAPI';
import GameCard from '../component/GameCard';

const useStyles = makeStyles({
  wrapper: {
    margin: '0 10px',
  },
  dashboard: {
    width: '100%',
    paddingTop: '10px',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [games, setGames] = useState([]);
  const [gamesQuestions, setGamesQuestions] = useState([]);
  useEffect(() => {
    let isCancelled = false;
    const getQuizzes = async () => {
      const quizzes = await Management.getQuizzes();
      if (quizzes.toString().match(/TypeError/)) {
        history.push('/error');
        return;
      }
      Promise.all(
        quizzes.quizzes.map((quiz) => Management.getQuiz(quiz.id).then((data) => ({
          ...data,
          id: quiz.id,
        }))),
      ).then((res) => {
        const sortedGames = res.sort(
          // eslint-disable-next-line no-nested-ternary
          (x, y) => (x.createdAt > y.createdAt ? 1 : y.createdAt > x.createdAt ? -1 : 0),
        );
        if (!isCancelled) {
          setGamesQuestions(sortedGames);
        }
      });
    };
    getQuizzes();
    return () => {
      isCancelled = true; // clean up
    };
  }, [games, history]);
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.dashboard}>
        <h1 className={classes.heading}>Dashboard</h1>
        <NewGameModal setGames={setGames} />
        <Grid container>
          {gamesQuestions.map((game) => (
            <Grid item key={game.id} xs={12} sm={6} md={4} lg={3}>
              <GameCard
                game={game}
                games={games}
                setGames={setGames}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
