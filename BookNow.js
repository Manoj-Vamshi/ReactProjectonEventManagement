import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, set, push } from 'firebase/database';
import { database } from './firebaseConfig';
import StripeCheckOut from './StripeCheckOut';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { UserContext } from './UserContext';
import  './Styling.css';

const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu');

const BookNow = () => {
    const { eventId } = useParams();
    const { userId } = useContext(UserContext);
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventRef = ref(database, `events/${eventId}`);
                const snapshot = await get(eventRef);
                if (snapshot.exists()) {
                    const eventData = snapshot.val();
                    setEvent(eventData);
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

    const calculateTotalPrice = () => {
        return tickets * (event?.ticketPrice || 0);
    };

    const handlePaymentSuccess = async () => {
        if (userId) {
            try {
                const bookingsRef = ref(database, `bookings/${userId}`);
                const newBookingRef = push(bookingsRef);
                const bookingData = {
                    eventId: eventId,
                    eventName: event.name,
                    userId: userId,
                    tickets: tickets,
                    bookingDate: new Date().toDateString()
                };
                await set(newBookingRef, bookingData);
                alert('Payment successful, booking created! Redirecting to homepage...');
                navigate('/attendeehomepage');
            } catch (error) {
                console.error('Error creating booking:', error);
            }
        } else {
            console.error('No user is authenticated.');
        }
        setIsPaymentComplete(true);
    };

    if (!event) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Book Event: {event.name}</h1>
            <div className="card p-4 mb-4 shadow-sm">
                <div className="card-body">
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
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

                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea
                                className="form-control"
                                id="address"
                                rows="3"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Ticket Price</label>
                            <input
                                type="text"
                                className="form-control"
                                value={`$${event?.ticketPrice || 0} per ticket`}
                                readOnly
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="tickets" className="form-label">Number of Tickets</label>
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

                        <div className="text-center mb-4">
                            <h4 className="fw-bold">Total Price</h4>
                            <p className="display-4 text-primary">
                                ${calculateTotalPrice()}
                            </p>
                        </div>

                        {!isPaymentComplete && (
                            <Elements stripe={stripePromise}>
                                <StripeCheckOut
                                    eventId={eventId}
                                    eventName={event.name}
                                    amount={calculateTotalPrice() * 100}
                                    onPaymentSuccess={handlePaymentSuccess}
                                />
                            </Elements>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookNow;
