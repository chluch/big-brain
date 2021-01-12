import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Based off https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
// but using React, no external CSS

const formatNumXPosition = (seconds) => {
  if (seconds < 10) {
    return 42;
  }
  if (seconds > 99) {
    return 29;
  }
  return 35;
};

// Why 283?
// circumference of circle = 2πr
// svg r=45, therefore inital circleDasharray = 2π(45) ~= 283
// If we change radius of svg we need to recalculate circleDasharray

const Timer = ({ question, setTimesUp }) => {
  const [time, setTime] = useState(question.timeLimit);
  const [circleDasharray, setCircleDasharray] = useState(283);
  const [colour, setColour] = useState('#21ada8');
  useEffect(() => {
    setTime(question.timeLimit);
  }, [question]);

  useEffect(() => {
    let countdownTimer;
    setCircleDasharray(`${(time / question.timeLimit) * 283} 283`);
    setColour('#21ada8');
    if (time <= question.timeLimit / 2) {
      setColour('orange');
    }
    if (time <= question.timeLimit / 3) {
      setColour('red');
    }
    if (time > 0) {
      countdownTimer = setTimeout(() => setTime(time - 1), 1000);
    }
    if (time === 0) {
      setTimesUp(true);
    }
    return () => {
      clearTimeout(countdownTimer);
    };
  }, [setTimesUp, time, question.timeLimit]);

  return (
    <div
      style={{
        fontSize: '24px',
      }}
    >
      {/* Size can be adjusted by height and width here */}
      <svg
        className="timer"
        viewBox="0 0 100 100"
        height="100"
        width="100"
        style={{ transform: 'scaleX(-1)' }}
      >
        <g>
          <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="9px" />
          <text
            x={formatNumXPosition(time)}
            y="60"
            fill="black"
            style={{
              transform: 'scaleX(-1)',
              transformOrigin: 'center',
            }}
          >
            {time}
          </text>
          <path
            id="base-timer-path-remaining"
            stroke={colour}
            fill="none"
            strokeWidth="9px"
            strokeDasharray={circleDasharray}
            style={{
              transform: 'rotate(90deg)',
              transformOrigin: 'center',
            }}
            d="M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0"
          />
        </g>
      </svg>
    </div>
  );
};

Timer.propTypes = {
  question: PropTypes.shape({
    timeLimit: PropTypes.number.isRequired,
  }).isRequired,
  setTimesUp: PropTypes.func.isRequired,
};

export default Timer;
