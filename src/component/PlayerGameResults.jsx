import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core/';
import { Check as CorrectIcon, Close as WrongIcon } from '@material-ui/icons';
import Chart from 'chart.js';

const columns = [
  { id: 'question', label: 'Question', minWidth: 80 },
  { id: 'response', label: 'Option(s) you selected', minWidth: 150 },
  { id: 'correct', label: 'Correct', minWidth: 50 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '500px',
    minWidth: '350px',
  },
  container: {
    maxHeight: 400,
  },
});

const createRows = (results) => {
  const resultsArray = [];
  results.map((result, index) => {
    if (result.answerIds.length === 0) {
      resultsArray.push({
        question: `Question ${index + 1}`,
        response: 'Too slow! ):',
        correct: <WrongIcon />,
      });
    } else {
      const response = result.answerIds.map((answer) => {
        let r;
        if (answer === '') {
          r = 'Too slow! ):';
        } else {
          r = parseInt(answer.toString().replace('choice-', ''), 10) + 1;
        }
        return r;
      });
      resultsArray.push({
        question: `Question ${index + 1}`,
        response: response.join(', '),
        correct: result.correct ? <CorrectIcon /> : <WrongIcon />,
      });
    }
    return resultsArray;
  });
  return resultsArray;
};

const formatDataForChart = (results) => {
  const correct = results.reduce((sum, result) => sum + (result.correct ? 1 : 0), 0);
  const wrong = results.length - correct;
  return [correct, wrong];
};

const calculatePercentage = (results) => {
  const correct = results.reduce((sum, result) => sum + (result.correct ? 1 : 0), 0);
  const percentage = ((correct / results.length) * 100).toFixed(1);
  return `${percentage}%`;
};

const PlayerGameResults = ({ results }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = createRows(results);
  const correctPercentage = calculatePercentage(results);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const ctx = document.getElementById('playerResults');
    if (results) {
      const chartData = formatDataForChart(results);
      // eslint-disable-next-line no-unused-vars
      const resultsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Correct', 'Wrong'],
          datasets: [
            {
              data: chartData,
              backgroundColor: [
                '#55a1e5',
                '#ed6e85',
              ],
            },
          ],
        },
      });
    }
  }, [results]);

  return (
    <Box style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    }}
    >
      <h1>
        Your Results:
        {` ${correctPercentage} Correct!`}
      </h1>
      <div style={{
        width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px', backgroundColor: '#f6efd0',
      }}
      >
        <canvas id="playerResults" aria-label="results-chart" height="100%" width="100%" />
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={`key-${i + 1}`}>
                  {columns.map((column) => {
                    const value = row[column.id] || null;
                    return (
                      <TableCell key={column.id}>
                        {value || null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

PlayerGameResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayerGameResults;
