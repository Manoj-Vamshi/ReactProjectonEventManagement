import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig'; 
import './Styling.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date</strong>: [2024/09/12]</p>
            <p>
                At <strong>VRV Events</strong>, we are committed to protecting your privacy and ensuring that your
                personal information is handled in a safe and responsible manner. This Privacy Policy outlines how
                we collect, use, and protect your personal information.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide to us when you:</p>
            <ul>
                <li>Register an account on our platform</li>
                <li>Sign up for our events or services</li>
                <li>Contact us for support or inquiries</li>
                <li>Interact with our website, such as by filling out forms or browsing event listings</li>
            </ul>
            <p>This information may include, but is not limited to:</p>
            <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Payment details (if applicable)</li>
                <li>Event preferences</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Provide and manage the services you have requested</li>
                <li>Process your event bookings and payments</li>
                <li>Send you important updates related to the events you’re attending</li>
                <li>Improve our website, customer service, and event offerings</li>
                <li>Communicate promotional offers, event updates, and news (with your consent)</li>
            </ul>

            <h2>3. How We Share Your Information</h2>
            <p>
                We do not sell or rent your personal information to third parties. However, we may share your
                information with trusted partners to facilitate services, such as:
            </p>
            <ul>
                <li>Payment processors for booking and payments</li>
                <li>Event organizers to manage the events you have signed up for</li>
                <li>Service providers that assist in website operation and hosting</li>
            </ul>

            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
                We use cookies and similar tracking technologies to:
            </p>
            <ul>
                <li>Improve your browsing experience</li>
                <li>Track website usage and performance</li>
                <li>Provide personalized content and recommendations</li>
            </ul>
            <p>
                You can control cookies through your browser settings. However, disabling cookies may affect
                the functionality of our website.
            </p>

            <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
    );
};

export default PrivacyPolicy;