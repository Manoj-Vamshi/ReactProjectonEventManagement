import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { database, auth } from './firebaseConfig'; 
import { ref, set } from 'firebase/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styling.css';

const CheckOutForm = ({ eventId, eventName, amount, onPaymentSuccess }) => {
    const elements = useElements();
    const stripe = useStripe();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBooking = async () => {
        const user = auth.currentUser;
    
        if (user) {
            const userId = user.uid;
            const bookingRef = ref(database, `bookings/${userId}/${Date.now()}`);
            await set(bookingRef, {
                eventId: eventId,
                eventName: eventName,
                userId: userId,
                bookingDate: new Date().toISOString(),
            });
            console.log('Booking successfully saved.');
        } else {
            console.error('No user is authenticated.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
    
        setLoading(true);
        setError(null);
    
        const cardElement = elements.getElement(CardNumberElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
    
        if (error) {
            setError(error.message);
            console.log('[Payment error]', error);
        } else {
            console.log('[Payment successful]', paymentMethod);
            await handleBooking();
            onPaymentSuccess();  
        }
    
        setLoading(false);
    };
    
    return (
        <div className="checkout-form-container">
        <h2>Payment Information</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <div className="form-control">
                    <CardNumberElement id="cardNumber" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <div className="form-control">
                    <CardExpiryElement id="expiry" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="cvc">CVC</label>
                <div className="form-control">
                    <CardCvcElement id="cvc" />
                </div>
            </div>
    
            {error && <div className="alert alert-danger">{error}</div>}
    
            <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    </div>
    
    );
};

export default CheckOutForm;
