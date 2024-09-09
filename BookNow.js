import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, push, get } from 'firebase/database';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import PayPalCheckout from './PayPalCheckout';

const BookNow = () => {
    const { eventId } = useParams();
    const [eventName, setEventName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tickets, setTickets] = useState(1);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventRef = ref(database, `events/${eventId}`);
                const snapshot = await get(eventRef);
                if (snapshot.exists()) {
                    const eventData = snapshot.val();
                    setEventName(eventData.name);
                } else {
                    console.log('Event does not exist.');
                }
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    const handlePaymentSuccess = () => {
        
        setIsPaymentComplete(true);
        navigate('/attendeehomepage'); 
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

                {!isPaymentComplete && (
                    <PayPalCheckout
                        eventId={eventId}
                        eventName={eventName}
                        amount={tickets * 10} 
                        tickets={tickets} 
                        onPaymentSuccess={handlePaymentSuccess} 
                    />
                )}
            </form>
        </div>
    );
};

export default BookNow;
