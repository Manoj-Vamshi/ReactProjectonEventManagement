import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig';
import { Link } from 'react-router-dom';
import './Styling.css';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const eventsRef = ref(database, 'events');
        
        onValue(eventsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const eventsArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
                setEvents(eventsArray);
            } else {
                setEvents([]);
            }
        });
    }, []);

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
