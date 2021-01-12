import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Edit as EditIcon } from '@material-ui/icons';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  button: {
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#99eebb',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
});

const EditQuestionButton = ({ qId }) => {
  const classes = useStyles();
  const { gId } = useParams();
  const linkDestination = `/edit/${gId}/${qId}`;
  return (
    <Button
      className={classes.button}
      aria-label="edit-question"
    >
      <Link to={linkDestination} className={`link-address ${classes.link}`}>
        <EditIcon fontSize="small" className="edit-icon" />
        Edit
      </Link>
    </Button>
  );
};

EditQuestionButton.propTypes = {
  qId: PropTypes.number.isRequired,
};

export default EditQuestionButton;
