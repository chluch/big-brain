import { makeStyles } from '@material-ui/core/styles';
// Styles for Login and Signup

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: '50px',
    width: '400px',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#007788',
    boxSizing: 'border-box',
    '@media (max-width:400px)': {
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
    boxShadow: '0 4px 5px -5px #007799',
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
    color: '#007788',
    backgroundColor: 'transparent',
  },
  button: {
    color: '#fff',
    backgroundColor: '#007788',
    margin: '20px 0',
    width: '100px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#99eebb',
      color: 'black',
    },
  },
  signupButtons: {
    display: 'flex',
    width: '210px',
    justifyContent: 'space-between',
  },
  errorMessage: {
    backgroundColor: 'orange',
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
