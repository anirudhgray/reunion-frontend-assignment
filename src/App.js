import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import 'primeflex/primeflex.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import Rent from './pages/Rent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Rent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
