import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig'; 
import './Styling.css';

const Contactus = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            const newContactKey = Date.now().toString(); 

            const contactRef = ref(database, `contacts/${newContactKey}`);

            await set(contactRef, {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString() 
            });
            setName('');
            setEmail('');
            setMessage('');

            alert('Your message has been sent successfully!');
        } catch (error) {
            console.error('Error saving form data:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="contact-container">
            <form onSubmit={handleSubmit} className="contact-form">
                <h2>Contact Us</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Contactus;
