import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import RobotCursor from './components/RobotCursor';
import StarParticles from './components/StarParticles';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TeamSection from './components/TeamSection';
import RegisterSection from './components/RegisterSection';
import './index.css';

/**
 * App – Root component.
 * Manages loading state and assembles all page sections.
 */
function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loading screen (shows for ~2s then fades) */}
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      {/* Main site (hidden until loaded) */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        {/* Global decorative layers */}
        <StarParticles />
        <RobotCursor />

        {/* Navigation */}
        <Navbar />

        {/* Page sections */}
        <main>
          <HeroSection />
          <TeamSection />
          <RegisterSection />
        </main>
      </div>
    </>
  );
}

export default App;
