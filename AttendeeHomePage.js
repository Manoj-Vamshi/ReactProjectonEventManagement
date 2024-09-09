import React, { useState, useEffect } from 'react';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import { get, ref, onValue } from 'firebase/database';

const AttendeeHomePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [bookedEvents, setBookedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;

            if (user) {
                
                const userRef = ref(database, 'users/' + user.uid);
                onValue(userRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setFirstName(userData.firstName);
                        setLastName(userData.lastName);
                    }
                });

                
                const bookingsRef = ref(database, 'bookings');
                onValue(bookingsRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const bookingsData = snapshot.val();
                        const userBookings = Object.values(bookingsData).filter(
                            (booking) => booking.userId === user.uid
                        );

                        
                        const eventPromises = userBookings.map(async (booking) => {
                            const eventRef = ref(database, `events/${booking.eventId}`);
                            const eventSnapshot = await get(eventRef);
                            if (eventSnapshot.exists()) {
                                return {
                                    ...booking,
                                    eventDetails: eventSnapshot.val(),
                                };
                            }
                            return booking;
                        });

                        Promise.all(eventPromises).then((userBookedEvents) => {
                            setBookedEvents(userBookedEvents);
                        });
                    }
                });
            }
        };

        const fetchEvents = async () => {
            
            const eventsRef = ref(database, 'events');
            onValue(eventsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const eventsData = snapshot.val();
                    const eventsArray = Object.values(eventsData);
                    setUpcomingEvents(eventsArray);
                }
            });
        };

        const loadData = async () => {
            await fetchUserData();
            await fetchEvents();
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="jumbotron text-center">
                <h1 className="display-4">Welcome, {firstName} {lastName}!</h1>
                <p className="lead">Explore exciting events and book your tickets now.</p>
            </div>

            <div className="container">
                
                <h2 className="text-center">Upcoming Events</h2>
                <div className="row">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event, index) => (
                            <div key={index} className="col-lg-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{event.name}</h5>
                                        <p className="card-text">Date: {event.date}</p>
                                        <p className="card-text">Location: {event.location}</p>
                                        <a href={`/book-now/${event.id}`} className="btn btn-primary">Book Now</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No upcoming events found.</p>
                    )}
                </div>

                <hr />

                
                <h2 className="text-center">Your Booked Events</h2>
                <div className="row">
                    {bookedEvents.length > 0 ? (
                        bookedEvents.map((booking, index) => (
                            <div key={index} className="col-lg-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                       
                                        <h5 className="card-title">
                                            {booking.eventDetails?.name || 'Event not found'}
                                        </h5>
                                      
                                        <p className="card-text">
                                            Date: {booking.eventDetails?.date || 'N/A'}
                                        </p>
                                       
                                        <p className="card-text">
                                            Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}
                                        </p>
                                       
                                        <p className="card-text">Tickets: {booking.tickets}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No booked events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendeeHomePage;
