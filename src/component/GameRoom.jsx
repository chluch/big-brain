import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useInterval from 'react-useinterval';
import PlayerAPI from '../api/PlayerAPI';
import Question from './ActiveQuestionCard';
import Answer from './AnswerCard';
import PlayerResults from './PlayerGameResults';
import PlayerContext from '../PlayerContext';

const GameRoom = () => {
  const history = useHistory();
  const [timesUp, setTimesUp] = useState(false);
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [polling, setPolling] = useState(true);
  const [result, setResult] = useState(null);
  const { playerId } = useContext(PlayerContext);
  const fetchQuestion = async () => {
    if (!polling) {
      return;
    }
    const api = new PlayerAPI(playerId);
    const res = await api.getQuestion(playerId);
    if (res.toString().match(/TypeError/)) {
      history.push('/error');
      return;
    }
    if (question && (res.question !== undefined && res.question.id !== question.id)) {
      setQuestion(res.question);
    }
  };
  useInterval(fetchQuestion, 3000);

  const fetchResults = async () => {
    const path = `http://localhost:5005/play/${playerId}/results`;
    const options = {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    };
    try {
      const response = await fetch(path, options);
      if (response.status === 200) {
        setPolling(false); // Turn off ALL polling when game is finished
        return response.json();
      }
      return null;
    } catch (err) {
      return err;
    }
  };

  const checkResults = async () => {
    if (!polling) {
      return;
    }
    const res = await fetchResults();
    setResult(res);
  };

  useInterval(checkResults, 3000);

  useEffect(() => {
    setTimesUp(false);
  }, [question]);

  // Gets correct answer
  useEffect(() => {
    let isCancelled = false;
    const fetchAnswer = async () => {
      if (!polling) {
        return;
      }
      const api = new PlayerAPI(playerId);
      const res = await api.getAnswer(playerId);
      if (res.toString().match(/TypeError/)) {
        history.push('/error');
        return;
      }
      if (!isCancelled) {
        setAnswer(res);
      }
    };
    fetchAnswer();
    return () => {
      isCancelled = true; // clean up
    };
  }, [history, playerId, polling, timesUp]);
  console.log(answer);

  return (
    <>
      { result === null && Object.keys(question).length === 0
        && <p>Waiting for host to start...Please do NOT leave this page!</p>}
      {result === null && question && Object.keys(question).length > 0
        && <Question q={question} timesUp={timesUp} setTimesUp={setTimesUp} />}
      {result === null && timesUp && <Answer q={question} /> }
      {result !== null && <PlayerResults results={result} />}
    </>
  );
};

export default GameRoom;
