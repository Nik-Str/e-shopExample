//React
import { useState, createContext } from 'react';
//React Router
import { Outlet } from 'react-router-dom';
//Components
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
//Css
import './index.css';

export const NavHeightContext = createContext(null);

function App() {
  //Height on the navbar
  const [navHeight, setNavHeight] = useState(0);

  return (
    <div className="App">
      <Navbar setNavHeight={setNavHeight} />
      <main>
        <div className="content">
          <NavHeightContext.Provider value={{ navHeight }}>
            <Outlet />
          </NavHeightContext.Provider>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
