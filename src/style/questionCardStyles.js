import { makeStyles } from '@material-ui/core/';

const useStyles = makeStyles({
  card: {
    margin: '5px auto',
    maxWidth: 320,
    height: 450,
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'auto',
  },
  uploadContainer: {
    height: 180,
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid black',
    backgroundColor: '#21ada8',
  },
  cardContent: {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#ffd1dc',
    wordBreak: 'break-word',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: 'black solid 1px',
  },
  questionDescription: {
    width: '100%',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 10px 0',
    boxShadow: '0 4px 5px -5px #000',
  },
  question: {
    fontSize: '18px',
    marginTop: '0',
  },
  img: {
    height: 180,
    width: 'auto',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    fontSize: '16px',
  },
  icon: {
    display: 'inline-block',
    marginBottom: '-2px',
  },
  gameInfoTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  gameInfo: {
    fontSize: '20px',
  },
});

export default useStyles;
