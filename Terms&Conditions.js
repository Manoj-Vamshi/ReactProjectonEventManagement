import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, auth } from './firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import './Styling.css';

const TermsAndConditions = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Terms and Conditions</h1>
            <p><strong>Effective Date</strong>: [2024/09/12]</p>
            <p>
                Welcome to <strong>VRV Events</strong>. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to comply with and be bound by these terms.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>By using our services, you agree to these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.</p>

            <h2>2. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. Your continued use of the site following the posting of changes will be deemed your acceptance of such changes.</p>

            <h2>3. User Responsibilities</h2>
            <p>As a user, you agree to:</p>
            <ul>
                <li>Provide accurate and complete information when registering or using our services.</li>
                <li>Maintain the confidentiality of your account and password.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
                <li>Refrain from using our services for any illegal or unauthorized purposes.</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>All content and materials on our website are the property of <strong>VRV Events</strong> or its licensors and are protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content without our prior written consent.</p>

            <h2>5. Limitation of Liability</h2>
            <p>Our liability for any claims arising out of or related to your use of our services is limited to the maximum extent permitted by law. We are not liable for any indirect, incidental, or consequential damages.</p>

            <h2>6. Governing Law</h2>
            <p>These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from these terms shall be resolved in the courts of [Your Jurisdiction].</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us at [Contact Information].</p>
        </div>
    );
};

export default TermsAndConditions;
