import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles({
  wrapper: {
    margin: '0 10px',
  },
  cardWrapper: {
    width: '100%',
    paddingTop: '10px',
    marginTop: '-10px',
  },
  gridContainer: {
    flexFlow: 1,
  },
  title: {
    marginBottom: '0',
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleButton: {
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '180px',
    height: '40px',
    margin: '0 10px',
    '&:hover': {
      backgroundColor: '#ddd',
    },
    '@media (max-width: 395px)': {
      fontSize: '10px',
      width: 'auto',
    },
  },
  editButton: {
    backgroundColor: '#21ada8',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '175px',
    height: '40px',
    margin: '0 10px 0 0',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
    '@media (max-width: 395px)': {
      fontSize: '10px',
    },
  },
  submitGameName: {
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '80px',
    height: '56px',
    margin: '0 10px 0 0',
    '&:hover': {
      backgroundColor: '#ddd',
    },
    '@media (max-width: 395px)': {
      width: '40px',
      fontSize: '10px',
    },
  },
  form: {
    display: 'flex',
  },
});

export default useStyles;
