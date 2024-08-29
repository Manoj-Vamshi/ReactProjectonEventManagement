import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <div >
        <Routes>
   
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
