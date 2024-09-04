import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckOutForm = ({ onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error:', error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
           
            onPaymentSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="card">Credit or Debit Card</label>
                <CardElement id="card" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

export default CheckOutForm;
