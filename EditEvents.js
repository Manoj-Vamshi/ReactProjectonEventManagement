import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, update } from 'firebase/database';
import { database } from './firebaseConfig';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        location: '',
        description: '',
        time: '',
        ticketPrice: ''  
    });

    useEffect(() => {
        const eventRef = ref(database, `events/${id}`);
        get(eventRef).then((snapshot) => {
            if (snapshot.exists()) {
                const eventData = snapshot.val();
                setEvent(eventData);
                setFormData({
                    name: eventData.name,
                    date: eventData.date,
                    location: eventData.location,
                    description: eventData.description,
                    time: eventData.time,
                    ticketPrice: eventData.ticketPrice || ''  
                });
            } else {
                console.log('No event found!');
            }
        }).catch((error) => {
            console.error('Error fetching event:', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventRef = ref(database, `events/${id}`);
        update(eventRef, formData).then(() => {
            console.log('Event updated successfully!');
            navigate(`/view-event/${id}`); 
        }).catch((error) => {
            console.error('Error updating event:', error);
        });
    };

    if (!event) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className="form-control"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        className="form-control"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ticketPrice">Ticket Price ($)</label>
                    <input
                        type="number"
                        id="ticketPrice"
                        name="ticketPrice"
                        className="form-control"
                        value={formData.ticketPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;
