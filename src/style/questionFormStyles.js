import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  box: {
    padding: '20px 30px',
  },
  uploadAction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0',
  },
  actionButtons: {
    display: 'flex',
    '@media (max-width: 530px)': {
      flexDirection: 'column',
    },
  },
  dropdown: {
    padding: '16px',
    border: '1px solid #bbb',
    borderRadius: '5px',
    margin: '5px',
  },
  uploadImgButton: {
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#21ada8',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
  },
  removeImgButton: {
    fontSize: '14px',
    backgroundColor: '#eee',
    marginLeft: '10px',
    '&:hover': {
      backgroundColor: '#ddd',
    },
    '@media (max-width: 530px)': {
      marginTop: '5px',
      marginLeft: 0,
    },
  },
  youtubeInput: {
    margin: '5px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#000',
  },
  caption: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#000',
    marginTop: '20px',
  },
  radio: {
    margin: theme.spacing(1),
    '& .MuiFormControlLabel-root': {
      marginBottom: '-5px',
      marginTop: '-5px',
    },
  },
  points: {
    marginBottom: '30px',
  },
  choicesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: '3',
    justifyContent: 'space-around',
  },
  choicesRadio: {
    padding: '8px',
    margin: '5px',
  },
  choicesCheckbox: {
    padding: '8px',
    margin: '10px',
    '& .MuiTypography-root': {
      marginLeft: '-8px',
    },
  },
  checklist: {
    display: 'flex',
    flexDirection: 'column',
    flex: '2',
    justifyContent: 'space-between',
  },
  submit: {
    marginTop: '20px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#000000',
    backgroundColor: '#99eebb',
    '&:hover': {
      backgroundColor: '#007788',
      color: '#ffffff',
    },
  },
}));

export default useStyles;
