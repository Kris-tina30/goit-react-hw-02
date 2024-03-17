import React from 'react';

const Feedback = ({ values, total, positive }) => {
  return (
    <ul>
      <li>good: {values.good}</li>
      <li>neutral: {values.neutral}</li>
      <li>bad: {values.bad}</li>
      <li>total: {total}</li>
      <li>positive: {positive} %</li>
    </ul>
  );
};
export default Feedback;
