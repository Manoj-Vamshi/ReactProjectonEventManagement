import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div >
        <Routes>
   
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
