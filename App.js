import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import EventOrganizerProfilePage from './EventOrganizerProfilePage';
import AdminHomePage from './AdminHomePage';
import AttendeeHomePage from './AttendeeHomePage';
import Aboutus from './Aboutus';
import Terms from './Terms&Conditions';
import CreateEvent from './CreateEvent';
import ManageEvents from './ManageEvent';
import BookNow from './BookNow';
import CheckOutForm from './CheckOutForm';
import EOHomepage from './EOHomepage'


function App() {
  return (
    <Router>
      <div>
        <header>
          <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
            <a id="logo" href="/" className="text-white font-weight-bold h4">VRV Events</a>
            <input id="search" type="text" className="form-control w-50" placeholder="Search" />
          </div>
        </header>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/EOHomepage" element={<EOHomepage />} />
          <Route path="/profile" element={<EventOrganizerProfilePage />} />
          
          
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="/attendeehomepage" element={<AttendeeHomePage />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/manageevent" element={<ManageEvents />} />
          <Route path="/book-now/:eventId" element={<BookNow />} />
          <Route path="/checkoutform" element={<CheckOutForm />} />

         
          
        </Routes>
      </div>
      <div>
        <footer className="bg-light text-center text-lg-start" id='footer'>
          <div className="container p-6">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">About Us</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="/about" className="text-dark">Who We Are</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Contact Us</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/contact" className="text-dark">Get in Touch</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Privacy Policy</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/privacy-policy" className="text-dark">Our Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Terms & Conditions</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/terms" className="text-dark">Read Terms</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center p-9 bg-dark text-white">
            <span>&copy; 2024 Event Management. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
