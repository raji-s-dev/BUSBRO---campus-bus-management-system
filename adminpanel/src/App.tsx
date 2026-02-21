// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useState, useEffect } from 'react';
import IntroAnimation from './components/introanimation/IntroAnimation';


function App() {

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000); // matches vanish + delay
    return () => clearTimeout(timer);
  }, []);


  return (
    <BrowserRouter>
      {showIntro && <IntroAnimation />}
      {!showIntro && <AppRoutes />}
    </BrowserRouter>


       
  );
}

export default App;
