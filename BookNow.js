import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, push } from 'firebase/database';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';  

const stripePromise = loadStripe('your-publishable-key-here');

const BookNow = () => {
    const { eventId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tickets, setTickets] = useState(1);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const navigate = useNavigate();

    const handleBooking = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const bookingRef = ref(database, 'bookings');
                await push(bookingRef, {
                    eventId,
                    userId: user.uid,
                    name,
                    email,
                    tickets,
                });
                alert('Booking successful!');
                navigate('/attendeehomepage');
            } else {
                alert('You need to be logged in to book an event.');
            }
        } catch (error) {
            console.error('Error booking event:', error);
            alert('Failed to book event. Please try again.');
        }
    };

    const handlePaymentSuccess = () => {
        setIsPaymentComplete(true);
        handleBooking();
    };

    return (
        <div className="container mt-5">
            <h1>Book Event</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tickets">Number of Tickets</label>
                    <input
                        type="number"
                        className="form-control"
                        id="tickets"
                        value={tickets}
                        onChange={(e) => setTickets(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                {!isPaymentComplete ? (
                    <Elements stripe={stripePromise}>
                        <CheckOutForm onPaymentSuccess={handlePaymentSuccess} />
                    </Elements>
                ) : (
                    <button type="button" className="btn btn-primary" onClick={handleBooking}>
                        Confirm Booking
                    </button>
                )}
            </form>
        </div>
    );
};

export default BookNow;
