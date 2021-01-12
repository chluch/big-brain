import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card, makeStyles } from '@material-ui/core';
import { Face as PlayerIcon } from '@material-ui/icons/';
import useInterval from 'react-useinterval';
import ManagementAPI from '../api/ManagementAPI';

const useStyles = makeStyles({
  waitListCard: {
    width: '100%',
    maxHeight: 250,
    overflow: 'scroll',
    margin: '10px 0',
    border: '2px solid #007788',
  },
  title: {
    margin: '0',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007788',
  },
  listGroup: {
    width: '100%',
    listStyleType: 'none',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '0',
  },
  listItem: {
    display: 'flex',
    width: '100px',
    padding: '5px 10px',
    wordBreak: 'break-word',
  },
});

const WaitList = ({ sessionId, polling }) => {
  const history = useHistory();
  const classes = useStyles();
  const [players, setPlayers] = useState([]);
  const getPlayers = async () => {
    if (!polling) {
      return;
    }
    const res = await ManagementAPI.getSessionStatus(sessionId);
    if (res.toString().match(/TypeError/)) {
      history.push('/error');
      return;
    }
    setPlayers(res.results.players);
  };
  useInterval(getPlayers, 2000);
  return (
    <>
      {players.length > 0
        ? (
          <Card className={classes.waitListCard} variant="outlined">
            <h1 className={classes.title}>Current Players:</h1>
            <ul className={classes.listGroup}>
              {players && players.map((player, i) => (
                <li className={classes.listItem} key={`${player}-${i + 1}`}>
                  <PlayerIcon fontSize="small" />
                  {player}
                </li>
              ))}
            </ul>
          </Card>
        )
        : <p>Waiting for players to join...</p>}
    </>
  );
};

WaitList.propTypes = {
  sessionId: PropTypes.number,
  polling: PropTypes.bool,
};

WaitList.defaultProps = {
  sessionId: null,
  polling: true,
};

export default WaitList;
