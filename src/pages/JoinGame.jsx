import React, { useState } from 'react';
import JoinGameForm from '../component/JoinGameForm';
import GameRoom from '../component/GameRoom';
import PlayerContext from '../PlayerContext';

const JoinGame = () => {
  const [join, setJoin] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  return (
    <PlayerContext.Provider value={{ playerId, setPlayerId }}>
      {join ? <GameRoom />
        : <JoinGameForm setJoin={setJoin} setPlayerId={setPlayerId} />}
    </PlayerContext.Provider>
  );
};

export default JoinGame;
