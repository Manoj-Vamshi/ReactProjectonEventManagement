import React, { useState, useEffect, useContext } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from './firebaseConfig'; 
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Styling.css';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const { userId, loading } = useContext(UserContext);

    useEffect(() => {
        if (loading) return; 

        if (!userId) {
            setEvents([]);
            return;
        }

        const eventsRef = ref(database, 'events');

        const unsubscribe = onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const filteredEvents = Object.entries(data)
                    .filter(([key, value]) => value.createdBy === userId) 
                    .map(([key, value]) => ({ id: key, ...value }));

                setEvents(filteredEvents);
            } else {
                setEvents([]);
            }
        }, (error) => {
            console.error('Error fetching events:', error);
        });

        return () => unsubscribe();
    }, [userId, loading]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const eventRef = ref(database, `events/${id}`);
                await remove(eventRef);
                // Remove the deleted event from the state
                setEvents(events.filter(event => event.id !== id));
                console.log('Event deleted successfully!');
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h1>Manage Events</h1>
            {events.length > 0 ? (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Event Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Location</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event.location}</td>
                                <td>
                                    <Link to={`/edit-event/${event.id}`} className="btn btn-sm btn-primary">Edit</Link>
                                    <Link to={`/view-event/${event.id}`} className="btn btn-sm btn-info ml-2">View</Link>
                                    <button 
                                        className="btn btn-sm btn-danger ml-2" 
                                        onClick={() => handleDelete(event.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No events found. Create a new event to get started.</p>
            )}
        </div>
    );
};

export default ManageEvents;
