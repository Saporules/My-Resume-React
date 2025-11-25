import React from 'react';
import resumeData from './resume/resumeData';
import ResumeLayout from './resume/resumeLayout';

const App = () => {
  return <ResumeLayout resumeData={resumeData} />;
};

export default App;

