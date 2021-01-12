/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js';
import { makeStyles } from '@material-ui/core';
import ManagementAPI from '../api/ManagementAPI';
import Leaderboard from '../component/Leaderboard';

const useStyles = makeStyles(() => ({
  resultsSpace: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '60%',
    height: '60%',
    margin: '0 auto',
  },
  graph: {
    marginTop: '5vh',
  },
}));

const ResultDisplay = () => {
  const [scores, setScores] = useState([]);
  const [results, setResults] = useState([]);
  const { quizId, gId } = useParams();
  const classes = useStyles();

  const getScores = (questions, results) => results.map((result) => {
    const score = result.answers.map((answer, index) => {
      if (answer.correct) {
        return questions[index].pointsWorth;
      }
      return 0;
    });
    return {
      name: result.name,
      score: score.reduce((a, b) => a + b, 0),
    };
  });

  useEffect(() => {
    let isCancelled = false;
    const getResults = async () => {
      const sessionResults = await ManagementAPI.getSessionResults(gId);
      setResults(sessionResults);
      const quiz = await ManagementAPI.getQuiz(quizId);
      setScores(getScores(quiz.questions, sessionResults.results));
    };
    if (!isCancelled) {
      getResults();
    }
    return () => {
      isCancelled = true; // clean up
    };
  }, [gId, quizId]);

  const getPercentages = (results) => {
    const correct = [];
    for (const question of results[0].answers) {
      correct.push(0);
    }
    for (const player of results) {
      for (let i = 0; i < player.answers.length; i += 1) {
        if (player.answers[i].correct) {
          correct[i] += 1;
        }
      }
    }
    return correct.map((value) => (value * 100) / results.length);
  };

  const getTimes = (results) => {
    const correct = [];
    for (const question of results[0].answers) {
      correct.push(0);
    }
    for (const player of results) {
      for (let i = 0; i < player.answers.length; i += 1) {
        if (player.answers[i].questionStartedAt && player.answers[i].answeredAt) {
          correct[i] += (new Date(player.answers[i].answeredAt)
            - new Date(player.answers[i].questionStartedAt)) / 1000;
        }
      }
    }
    return correct.map((value) => value / results.length);
  };

  useEffect(() => {
    const ctx = document.getElementById('correct');
    const time = document.getElementById('time');

    if (results.results && results.results.length > 0) {
      const data = getPercentages(results.results);
      const correctPercent = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((value, index) => `Question ${index + 1}`),
          datasets: [{
            barPercentage: 0.5,
            barThickness: 35,
            maxBarThickness: 50,
            minBarLength: 2,
            data,
            backgroundColor: data.map(() => '#3e95cd'),
          }],
        },
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: '% Correctly Answered',
              },
              ticks: {
                beginAtZero: true,
                max: 100,
              },
            }],
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Correct Answers per Question',
          },
        },
      });
      const respondTime = new Chart(time, {
        type: 'bar',
        data: {
          labels: data.map((value, index) => `Question ${index + 1}`),
          datasets: [{
            barPercentage: 0.5,
            barThickness: 35,
            maxBarThickness: 50,
            minBarLength: 2,
            data: getTimes(results.results),
            backgroundColor: data.map(() => '#3e95cd'),
          }],
        },
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Time (seconds)',
              },
              ticks: {
                beginAtZero: true,
              },
            }],
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Average Response Time',
          },
        },
      });
    }
  }, [results]);

  return (
    <div className={classes.resultsSpace}>
      <h1>
        Results
      </h1>
      <h2 style={{ fontSize: '12px', color: '#666' }}>Top 5 Players</h2>
      <Leaderboard scores={scores} />
      <canvas className={classes.graph} id="correct" width="50%" height="50*" />
      <canvas className={classes.graph} id="time" width="50%" height="50*" />
    </div>

  );
};

export default ResultDisplay;
