import './App.scss';
import resumeData from './resumeData';
import ResumeCover from './components/ResumeCover/ResumeCover';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <ResumeCover data={resumeData} />
      <Footer />
    </div>
  );
}

export default App;
