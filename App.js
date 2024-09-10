import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './LoginPage';
import EventOraganiserHomePage from './EventOrganiserHomePage';
import AdminHomePage from './AdminHomePage';
import AttendeeHomePage from './AttendeeHomePage';
import Aboutus from './Aboutus';
import Terms from './Terms&Conditions';
import CreateEvent from './CreateEvent';
import ManageEvents from './ManageEvent';
import BookNow from './BookNow';  
import CheckOutForm from './CheckOutForm';
import Logo from './vrv1.jpg';
import Contactus from './Contactus.js';

function App() {
  return (
    <Router>
      <div id="root">
        <header>
        <div className="d-flex justify-content-between align-items-center p-2 bg-dark text-white">
        <a id="Logo" href="/" className="text-white d-flex align-items-center">
          <img src={Logo} alt="VRV" style={{ height: '75px', marginRight: '15px' }} />
          <span className="h4 mb-0 ml-2">VRV Events</span>
        </a>
            <div className="d-flex justify-content-center w-100">
              <input id="search" type="text" className="form-control text-center" placeholder="Search" style={{ width: '400px' }} />
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/eventoragniserhomepage" element={<EventOraganiserHomePage />} />
            <Route path="/attendeehomepage" element={<AttendeeHomePage />} />
            <Route path="/adminhomepage" element={<AdminHomePage />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/manageevent" element={<ManageEvents />} />
            <Route path="/book-now/:eventId" element={<BookNow />} />
            <Route path="/checkoutform" element={<CheckOutForm />} />
          </Routes>
        </main>
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
                    <a href="PrivacyPolicy.html" className="text-dark">Our Policy</a>
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
    </Router>
  );
}

export default App;
