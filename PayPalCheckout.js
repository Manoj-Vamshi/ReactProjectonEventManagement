import React, { useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { database, auth } from './firebaseConfig';

const PayPalCheckout = ({ eventId, eventName, amount, tickets, onPaymentSuccess }) => {
    const handleBooking = async () => {
        const user = auth.currentUser;

        if (user) {
            const bookingRef = ref(database, 'bookings');
            await push(bookingRef, {
                userId: user.uid,
                eventId: eventId || 'unknown',
                eventName: eventName || 'Unknown Event',
                tickets: tickets,
                bookingDate: new Date().toISOString(),
                paymentStatus: 'pending',
            });
        } else {
            console.error('User is not authenticated.');
        }
    };

    useEffect(() => {
       
        if (window.paypal && document.getElementById('paypal-button-container').innerHTML === '') {
            window.paypal.Buttons({
                fundingSource: window.paypal.FUNDING.PAYPAL,
                createOrder: (data, actions) => {
                    handleBooking(); 
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount.toFixed(2), 
                            },
                        }],
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        console.log('Transaction completed by ' + details.payer.name.given_name);
                        onPaymentSuccess(); 
                    });
                },
                onError: (err) => {
                    console.error('PayPal Checkout Error:', err);
                },
            }).render('#paypal-button-container'); 
        }
    }, [amount]);

    return (
        <div>
          
            <div id="paypal-button-container" style={{ margin: '20px 0' }}></div>
        </div>
    );
};

export default PayPalCheckout;
