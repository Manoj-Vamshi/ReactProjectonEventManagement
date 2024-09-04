import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from './firebaseConfig';
import { ref, push } from 'firebase/database';
import './Styling.css';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventName || !eventDate || !eventTime || !eventLocation) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            const eventsRef = ref(database, 'events');
            const newEvent = {
                name: eventName,
                date: eventDate,
                time: eventTime,
                location: eventLocation,
                description: eventDescription,
                createdBy: auth.currentUser.uid,
            };

            await push(eventsRef, newEvent);
            navigate('/manageevent'); // Redirect to manage events page after successful creation
        } catch (error) {
            console.error('Error creating event:', error);
            setError('Failed to create event. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Create Event</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="eventName"
                        placeholder="Enter event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventTime">Event Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="eventTime"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventLocation">Event Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="eventLocation"
                        placeholder="Enter event location"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDescription">Event Description</label>
                    <textarea
                        className="form-control"
                        id="eventDescription"
                        rows="4"
                        placeholder="Enter event description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
