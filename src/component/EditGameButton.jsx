import React from 'react';
import { Link } from 'react-router-dom';
import { Edit as EditIcon } from '@material-ui/icons';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  editButton: {
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#99eebb',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
  },
  editLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const EditGameButton = ({ gameId }) => {
  const classes = useStyles();
  const linkDestination = `/edit/${gameId}`;
  return (
    <Button
      className={classes.editButton}
      aria-label="edit-game-button"
    >
      <Link to={linkDestination} className={classes.editLink}>
        <EditIcon fontSize="small" />
        Edit Game
      </Link>
    </Button>
  );
};

EditGameButton.propTypes = {
  gameId: PropTypes.number.isRequired,
};

// ORIGINAL:
// const useStyles = makeStyles(() => ({
//   editButton: {
//     width: '30px',
//     height: '30px',
//     '&:hover': {
//       backgroundColor: '#ddd',
//     },
//   },
//   editLink: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   editIcon: {
//     color: '#2a9df4',
//   },
// }));

// const EditGameButton = ({ gameId }) => {
//   const classes = useStyles();
//   const linkDestination = `/edit/${gameId}`;
//   return (
//     <IconButton
//       className={classes.editButton}
//       aria-label="edit-game-button"
//     >
//       <Link to={linkDestination} className={classes.editLink}>
//         <EditIcon className={classes.editIcon} />
//       </Link>
//     </IconButton>
//   );
// };

export default EditGameButton;
