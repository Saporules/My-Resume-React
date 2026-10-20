import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Summary from './components/Summary/Summary';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Leadership from './components/Leadership/Leadership';
import Earlier from './components/Earlier/Earlier';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Summary />
        <Experience />
        <Skills />
        <Leadership />
        <Earlier />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
