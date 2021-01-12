import React from 'react';
import { DeleteForever as DeleteIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Management from '../api/ManagementAPI';

const useStyles = makeStyles(() => ({
  deleteButton: {
    fontSize: '14px',
    '&:hover': {
      color: 'red',
      backgroundColor: '#ddd',
    },
  },
}));

const DeleteGameButton = ({ gameId, onClick }) => {
  const classes = useStyles();
  const handleClick = () => {
    Management.deleteGame(gameId);
  };
  return (
    <Button
      className={classes.deleteButton}
      onClick={() => {
        onClick();
        handleClick(gameId);
      }}
      aria-label="delete-game-button"
    >
      <DeleteIcon fontSize="small" className="delete-icon" />
      Delete
    </Button>
  );
};

DeleteGameButton.propTypes = {
  gameId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

// ORIGINAL:
// const useStyles = makeStyles(() => ({
//   deleteButton: {
//     width: '30px',
//     height: '30px',
//     '&:hover': {
//       backgroundColor: '#ddd',
//     },
//   },
//   deleteIcon: {
//     color: 'red',
//   },
// }));
// const DeleteGameButton = ({ gameId, onClick }) => {
//   const classes = useStyles();
//   const handleClick = () => {
//     Management.deleteGame(gameId);
//   };
//   return (
//     <IconButton
//       className={classes.deleteButton}
//       onClick={() => {
//         onClick();
//         handleClick(gameId);
//       }}
//       aria-label="delete-game-button"
//     >
//       <DeleteIcon className={classes.deleteIcon} />
//     </IconButton>
//   );
// };

export default DeleteGameButton;
