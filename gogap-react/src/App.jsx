import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DemoSearch from './components/DemoSearch';
import AboutUs from './components/AboutUs';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen premium-bg font-body text-forest selection:bg-mint selection:text-forest overflow-x-hidden relative">
      <Navbar />
      <main>
        <Hero />
        <DemoSearch />
        <AboutUs />
        <Solution />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
