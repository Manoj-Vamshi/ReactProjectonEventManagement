import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Styling.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };



  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div>
      <div className="container-fluid">

        <div className="tagline">
          <h1 className="text-primary">VRV Events</h1>
          <p>"Simplify, Organize, Celebrate..!!"</p>
       
       
          <button className="btn  btn-outline-secondary" onClick={handleSignupClick}>Sign Up</button>
          <button className="btn  btn-outline-secondary" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
