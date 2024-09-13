import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Styling.css'; 

const StripeCheckOut = ({ eventId, eventName, amount, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
        });

        if (error) {
            console.error('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            onPaymentSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="payment-columns">
                <div className="payment-column">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <div className="form-control">
                            <CardNumberElement id="cardNumber" />
                        </div>
                    </div>
                </div>
                <div className="payment-column">
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
                </div>
            </div>
            <button type="submit" className="btn-submit" disabled={!stripe}>
                Pay ${amount / 100}
            </button>
        </form>
    );
};

export default StripeCheckOut;
