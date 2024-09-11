import React, { useState, useEffect, useContext } from 'react';
import { ref, get } from 'firebase/database';
import { database, auth } from './firebaseConfig';
import { Link } from 'react-router-dom'; 
import { UserContext } from './UserContext'; 
import { signOut } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';


const AttendeeHomepage = () => {
    const [events, setEvents] = useState([]);
    const [bookedEvents, setBookedEvents] = useState([]);
    const { userId } = useContext(UserContext); 
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsRef = ref(database, 'events');
                const snapshot = await get(eventsRef);
                if (snapshot.exists()) {
                    const eventsData = snapshot.val();
                    const eventsList = Object.keys(eventsData).map(key => ({
                        id: key,
                        ...eventsData[key]
                    }));
                    setEvents(eventsList);
                } else {
                    console.log('No events found.');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchBookedEvents = async () => {
                try {
                    const bookingsRef = ref(database, `bookings/${userId}`);
                    const snapshot = await get(bookingsRef);
                    if (snapshot.exists()) {
                        const bookingsData = snapshot.val();
                        const bookedEventsList = Object.keys(bookingsData).map(key => ({
                            id: key,
                            ...bookingsData[key]
                        }));
                        setBookedEvents(bookedEventsList);
                    } else {
                        console.log('No booked events found for this user.');
                    }
                } catch (error) {
                    console.error('Error fetching booked events:', error);
                }
            };
            fetchBookedEvents();
        }
    }, [userId]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/Login'); 
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

  
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-4">
                <h1>Attendee Homepage</h1>
                <button className="btn btn-danger" onClick={handleLogout}>Sign Out</button>
            </div>

            <section className="mb-5">
                <h2>Upcoming Events</h2>
                {events.length > 0 ? (
                    <div className="list-group">
                        {events.map(event => (
                            <div key={event.id} className="list-group-item mb-3">
                                <h4 className="mb-1">{event.name}</h4>
                                <p className="mb-1"><strong>Date:</strong> {(event.date)} at {event.time}</p>
                                <p className="mb-1"><strong>Location:</strong> {event.location}</p>
                                <p className="mb-1"><strong>Description:</strong> {event.description}</p>
                                <Link to={`/book-now/${event.id}`} className="btn btn-primary">Book Now</Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No upcoming events available.</p>
                )}
            </section>

            <section>
                <h2>My Booked Events</h2>
                {bookedEvents.length > 0 ? (
                    <div className="list-group">
                        {bookedEvents.map(event => (
                            <div key={event.id} className="list-group-item mb-3">
                                <h4 className="mb-1">{event.eventName}</h4>
                                <p className="mb-1"><strong>Booked on:</strong> {(event.bookingDate)}</p>
                                <p className="mb-1"><strong>Tickets:</strong> {event.tickets}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No booked events found.</p>
                )}
            </section>
        </div>
    );
};

export default AttendeeHomepage;
