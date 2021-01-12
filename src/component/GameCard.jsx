import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteGameButton from './DeleteGameButton';
import EditGameButton from './EditGameButton';
import StartGameButton from './StartGameButton';

const useStyles = makeStyles({
  root: {
    margin: '5px auto',
    maxWidth: 300,
    height: 200,
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  gameInfo: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  pos: {
    marginBottom: 12,
  },
  top: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
    margin: '0 auto',
    width: '90%',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '10px',
  },
});

const formatGameTime = (questionsArray) => {
  const totalSeconds = questionsArray.reduce((initial, { timeLimit }) => initial + timeLimit, 0);
  return new Date(totalSeconds * 1000).toISOString().substr(11, 8);
};

const GameCard = ({ game, games, setGames }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.top}>
          <Typography variant="h5" component="h2">
            {game.name}
          </Typography>
          <DeleteGameButton
            gameId={game.id}
            float="right"
            onClick={() => {
              setGames(games.filter((mapGame) => mapGame.id !== game.id));
            }}
          />
        </div>
        <div className={classes.gameInfo}>
          <Typography className={classes.pos} color="textSecondary">
            {`Questions: ${game.questions.length}`}
          </Typography>
          <Typography color="textSecondary">
            {`Total time: ${(formatGameTime(game.questions))}`}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          {game.thumbnail
            && (
            <img
              src={game.thumbnail}
              alt="Quiz thumbnail"
            />
            )}
        </Typography>
      </CardContent>
      <div className={classes.actions}>
        {/* If there's no question, hide start game button */}
        <EditGameButton gameId={game.id} className={classes.editGameButton} />
        {game.questions.length === 0
          ? null : <StartGameButton existingGame={game} gameId={game.id} />}
      </div>
    </Card>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape().isRequired,
  games: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setGames: PropTypes.func.isRequired,
};

export default GameCard;
