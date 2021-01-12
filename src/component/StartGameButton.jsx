import React, { useState, useEffect } from 'react';
import {
  Modal, TextField, Box, Paper, Button, IconButton, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Close as CloseIcon, FileCopy as CopyIcon } from '@material-ui/icons/';
import { useHistory } from 'react-router-dom';
import ManagementAPI from '../api/ManagementAPI';
import WaitList from './WaitList';

function getModalStyle() {
  return {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    position: 'absolute',
    top: '17%',
    margin: 'auto',
    width: '600px',
    backgroundColor: '#007788',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    display: 'flex',
    '@media (max-width:600px)': {
      top: '15%',
      width: '80vw',
    },
  },
  paper: {
    padding: theme.spacing(3),
    margin: '0',
    width: '100%',
    backgroundColor: 'white',
    overflow: 'auto',
  },
  copyUrl: {
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#99eebb',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
  },
  closeIcon: {
    float: 'right',
    margin: '-22px',
  },
}));

const copyId = (gameId) => {
  const text = document.getElementById(`copyGame${gameId}`);
  text.select();
  text.setSelectionRange(0, 99999);

  document.execCommand('copy');
};

const StartGameButton = ({ gameId }) => {
  const history = useHistory();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [polling, setPolling] = useState(true);
  const [game, setGame] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let isCancelled = false;
    const initialState = async () => {
      if (!isCancelled) {
        setGame(await ManagementAPI.getQuiz(gameId));
      }
    };
    initialState();
    return () => {
      isCancelled = true; // clean up
    };
  }, [gameId]);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Box style={modalStyle} className={classes.modalBody}>
      <Paper className={classes.paper} elevation={3}>
        <IconButton
          onClick={handleClose}
          aria-label="close-start-game-modal"
          className={classes.closeIcon}
        >
          <CloseIcon />
        </IconButton>
        <h1 id="start-game-modal-title">Started Game!</h1>
        <TextField
          label="Game URL"
          variant="outlined"
          value={`${window.location.origin}/play/${game.active}`}
          id={`copyGame${game.active}`}
          readOnly
          fullWidth
        />
        <Button
          className={classes.copyUrl}
          variant="contained"
          color="primary"
          onClick={() => {
            copyId(game.active);
          }}
          disableElevation
        >
          <CopyIcon fontSize="small" />
          Copy URL
        </Button>
        {/* Displays list of players joining the game */}
        <WaitList sessionId={game.active} polling={polling} />
        <Button
          variant="contained"
          color="primary"
          aria-label="advance-game"
          disableElevation
          onClick={async () => {
            const gameProgression = await ManagementAPI.advanceQuiz(gameId);
            if (gameProgression.stage >= 0) {
              setPolling(false);
            }
            if (gameProgression.stage === game.questions.length) {
              history.push(`results/${gameId}/${game.active}`);
            }
          }}
        >
          Advance Game
        </Button>
      </Paper>
    </Box>
  );
  return (
    <div>
      {!game.active && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          className={classes.Button}
          aria-label="start-game"
          onClick={async () => {
            await ManagementAPI.startQuiz(gameId);
            setGame(await ManagementAPI.getQuiz(gameId));
            handleOpen();
          }}
        >
          Start Game!
        </Button>
      )}

      {game.active
        && (
          <Button
            color="secondary"
            variant="contained"
            className={classes.Button}
            aria-label="end-game-button"
            onClick={async () => {
              ManagementAPI.endQuiz(gameId);
              setGame(await ManagementAPI.getQuiz(gameId));
              setPolling(true); // reset to initial state
              // TODO: Display results of the game
            }}
            disableElevation
          >
            End Game
          </Button>
        )}
      <Modal
        disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        {body}
      </Modal>
    </div>
  );
};

StartGameButton.propTypes = {
  gameId: PropTypes.number.isRequired,
};

export default StartGameButton;
