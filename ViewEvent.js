import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { database } from './firebaseConfig';

const ViewEvent = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const eventRef = ref(database, `events/${id}`);
        get(eventRef).then((snapshot) => {
            if (snapshot.exists()) {
                setEvent(snapshot.val());
            } else {
                console.log('No event found!');
            }
        }).catch((error) => {
            console.error('Error fetching event:', error);
        });
    }, [id]);

    if (!event) return <p>Loading...</p>;

    return (
        <div>
            <h1>View Event</h1>
            <p><strong>Name:</strong> {event.name}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Ticket Price:</strong> {event.ticketPrice}</p>
        </div>
    );
};

export default ViewEvent;
