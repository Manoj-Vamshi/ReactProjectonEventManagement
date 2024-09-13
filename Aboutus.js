import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig'; 
import './Styling.css';

const Aboutus = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                At <strong>VRV Events</strong>, we believe in the power of connection. Whether it's a corporate conference, a private celebration, or a community gathering, our mission is to create unforgettable experiences that inspire, engage, and connect people.
            </p>
            
            <h2>Who We Are</h2>
            <p>
                VRV Events is a full-service event planning and production company that brings creativity, precision, and innovation to every event we design. With a dedicated team of experts specializing in event management, audio-visual production, and custom event experiences, we ensure that every detail of your event is meticulously planned and executed.
            </p>

            <h2>What We Do</h2>
            <ul>
                <li>Corporate events & conferences</li>
                <li>Weddings & private parties</li>
                <li>Festivals & concerts</li>
                <li>Product launches & brand activations</li>
                <li>Virtual and hybrid events</li>
            </ul>
            <p>
                We combine cutting-edge technology with creativity to bring your vision to life, no matter the size or complexity. Our tailored approach ensures each event is unique and resonates with your goals, audience, and values.
            </p>

            <h2>Our Vision</h2>
            <p>
                To become a leading name in event production by blending traditional event expertise with the latest trends in technology and design, ensuring every event is memorable, seamless, and innovative.
            </p>

            <h2>Our Values</h2>
            <ul>
                <li><strong>Creativity:</strong> Every event tells a story, and we bring our creative expertise to make yours unforgettable.</li>
                <li><strong>Innovation:</strong> We integrate the latest event technologies and trends to deliver exceptional results.</li>
                <li><strong>Precision:</strong> From the smallest details to the biggest decisions, we are meticulous in our planning and execution.</li>
                <li><strong>Sustainability:</strong> We prioritize eco-friendly practices and encourage sustainable choices in event planning.</li>
            </ul>

            <h2>Why Choose Us?</h2>
            <p>
                We believe in creating experiences, not just events. At VRV Events, we don’t just plan – we curate moments that leave lasting impressions. Our passion, commitment, and attention to detail set us apart, ensuring your event is a success.
            </p>
            
            <p><strong>Ready to make your next event extraordinary? Let’s start planning together!</strong></p>
        </div>
    );
};

export default Aboutus;
