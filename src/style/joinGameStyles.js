import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    // flex: '1',
    marginTop: '50px',
    width: '400px',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '5px',
    boxSizing: 'border-box',
    backgroundColor: '#99eebb',
    '@media (max-width:500px)': {
      marginTop: '0',
      borderRadius: '0',
      width: '100vw',
    },
  },
  container: {
    padding: '0 10px',
    backgroundColor: '#fff',
  },
  heading: {
    margin: '0 0 30px 0',
    padding: '30px 25px 5px 25px',
    fontSize: '40px',
    boxShadow: '0 4px 5px -5px #99eebb',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiFormLabel-root': {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1.2),
      width: '90%',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '2px',
      fontSize: '1.2rem',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: '4px',
    },
  },
  icon: {
    color: '#21ada8',
    backgroundColor: 'transparent',
  },
  button: {
    color: '#000000',
    backgroundColor: '#99eebb',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '100px',
    height: '40px',
    margin: '20px 0',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
  },
  errorMessage: {
    backgroundColor: '#f88b86',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    height: '20px',
    padding: '10px',
    borderRadius: '100px',
    marginBottom: '10px',
  },
}));

export default useStyles;
