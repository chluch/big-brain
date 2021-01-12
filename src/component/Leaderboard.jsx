import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
  },
});

export default function BasicTable(scores) {
  const classes = useStyles();
  const getTopFive = (score) => {
    const sortedScores = score.sort(
      // eslint-disable-next-line no-nested-ternary
      (x, y) => (x.score < y.score ? 1 : y.score < x.score ? -1 : 0),
    );
    return sortedScores.slice(0, 5);
  };
  const topFive = getTopFive(scores.scores);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topFive.map((score) => (
            <TableRow key={score.name}>
              <TableCell component="th" scope="row">
                {score.name}
              </TableCell>
              <TableCell align="right">{score.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
