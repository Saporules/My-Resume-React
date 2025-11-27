import './App.scss';
import resumeData from './resumeData';
import ResumeCover from './components/ResumeCover/ResumeCover';

function App() {
  return (
    <div className="App">
      <ResumeCover data={resumeData} />
    </div>
  );
}

export default App;
