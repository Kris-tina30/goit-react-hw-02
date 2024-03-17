import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import Feedback from './components/Feedback';
import Options from './components/Options';
import Notification from './components/Notification';
import Description from './components/Description';

function App() {
  const initialValues = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [values, setValues] = useState(() => {
    const stringifiedValues = localStorage.getItem('feedbackValues');
    const parsedValues = JSON.parse(stringifiedValues) ?? initialValues;
    return parsedValues;
  });

  const [isVisibleButton, setIsVisibleButton] = useState(false);

  const updateFeedback = feedbackType => {
    setValues({ ...values, [feedbackType]: values[feedbackType] + 1 });
    setIsVisibleButton(true);
  };

  const totalFeedback = values.good + values.neutral + values.bad;
  const positive = Math.round(((values.good + values.neutral) / totalFeedback) * 100);

  const handleResetButton = () => {
    setValues(initialValues);
    setIsVisibleButton(false);
  };

  useEffect(() => {
    localStorage.setItem('feedbackValues', JSON.stringify(values));
  }, [values]);
  return (
    <>
      <Description />

      <Options
        updateFeedback={updateFeedback}
        onReset={handleResetButton}
        total={totalFeedback}
        isVisibleButton={isVisibleButton}
      />
      {totalFeedback > 0 ? (
        <Feedback values={values} total={totalFeedback} positive={positive} />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
