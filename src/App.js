//Components
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
//Css
import './index.css';
//React Router
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <div className="content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
