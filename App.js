import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import EventOrganiserProfilePage from './EventOrganiserProfilePage';
import AdminHomePage from './AdminHomePage';
import AttendeeHomePage from './AttendeeHomePage';
import Aboutus from './Aboutus';
import Terms from './Terms&Conditions';
import CreateEvent from './CreateEvent';
import ManageEvents from './ManageEvent';
import EditEvent from './EditEvents';
import ViewEvent from './ViewEvent';
import BookNow from './BookNow';
import CheckOutForm from './CheckOutForm';
import Contactus from './Contactus';
import EOHomepage from './EOHomepage';
import Logo from './vrv1.jpg';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PrivacyPolicy from './PrivacyPolicy';


const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu');



function App() {
  return (
    <Router>
       <Elements stripe={stripePromise}>
      <div>
      <header>
        <div className="d-flex justify-content-between align-items-center p-2 bg-dark text-white">
        <a id="Logo"  className="text-white d-flex align-items-center">
          <img src={Logo} alt="VRV" style={{ height: '75px', marginRight: '15px' }} />
          <span className="h4 mb-0 ml-2">VRV Events</span>
        </a>
            <div className="d-flex justify-content-center w-100">
              <input id="search" type="text" className="form-control text-center" placeholder="Search" style={{ width: '400px' }} />
            </div>
          </div>
        </header>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/EOHomepage" element={<EOHomepage />} />
          <Route path="/profile" element={<EventOrganiserProfilePage />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/view-event/:id" element={<ViewEvent />} />
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="/attendeehomepage" element={<AttendeeHomePage />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/terms" element={<Terms />} />
  <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/manageevent" element={<ManageEvents />} />
          <Route path="/book-now/:eventId" element={<BookNow />} />
          <Route path="/checkoutform" element={<CheckOutForm />} />
        </Routes>
        
      </div>
      <div>
      <footer className="bg-light text-center text-lg-start">
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
                    <a href="Contactus" className="text-dark">Get in Touch</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Privacy Policy</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="PrivacyPolicy" className="text-dark">Our Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Terms & Conditions</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="terms" className="text-dark">Read Terms</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center p-3 bg-dark text-white">
            <span>&copy; 2024 Event Management. All rights reserved.</span>
          </div>
        </footer>
      </div>
      </Elements>
    </Router>
  );
}

export default App;
