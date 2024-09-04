import React, { useState, useEffect } from 'react';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import { ref, get } from 'firebase/database';

const AttendeeHomePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(database, 'users/' + user.uid);
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setFirstName(userData.firstName);
                    setLastName(userData.lastName);
                } else {
                    console.error('No user data available');
                }
            }
        };

        const fetchEvents = async () => {
            try {
                const eventsRef = ref(database, 'events');
                const snapshot = await get(eventsRef);

                if (snapshot.exists()) {
                    const eventsData = snapshot.val();
                    const eventsArray = Object.values(eventsData); // Convert event object to array
                    setEvents(eventsArray);
                } else {
                    console.error('No events available');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
        fetchEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;

    return (
        <div>
            <div className="jumbotron text-center">
                <h1 className="display-4">Welcome, {firstName} {lastName}!</h1>
                <p className="lead">Explore exciting events and book your tickets now.</p>
            </div>

            <div className="container">
                <h2 className="text-center lg-8">Upcoming Events</h2>
                <div className="row">
                    {events.length > 0 ? (
                        events.map((event, index) => (
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
            </div>
        </div>
    );
};

export default AttendeeHomePage;
