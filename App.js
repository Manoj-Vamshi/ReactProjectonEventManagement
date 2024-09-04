import logo from './logo.svg';
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


function App() {
  return (
    <Router>
      <div>
        <header>
          <div class="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
            <a id="logo" href="/" class="text-white font-weight-bold h4">VRV Events</a>
            <input id="search" type="text" class="form-control w-50" placeholder="Search" />
          </div>
        </header>
      </div>
      <div >
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




          Terms

         


        </Routes>
      </div>
      <div>
        <footer class="bg-light text-center text-lg-start" id='footer'>
          <div class="container p-6">
            <div class="row">

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">About Us</h5>
                <ul class="list-unstyled mb-0">
                  <li>
                    <a href="/about" class="text-dark">Who We Are</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Contact Us</h5>
                <ul class="list-unstyled">
                  <li>
                    <a href="Contactus.html" class="text-dark">Get in Touch</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Privacy Policy</h5>
                <ul class="list-unstyled">
                  <li>
                    <a href="PrivacyPolicy.html" class="text-dark">Our Policy</a>
                  </li>
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Terms & Conditions</h5>
                <ul class="list-unstyled">
                  <li>
                    <a href="terms" class="text-dark">Read Terms</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="text-center p-9 bg-dark text-white">
            <span>&copy; 2024 Event Management. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </Router>

  );
}

export default App;
