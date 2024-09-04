import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, database } from './firebaseConfig';
import { ref, get } from 'firebase/database';
import './Styling.css';

const EventOraganiserHomePage = () => {
    const [firstName, setFirstName] = useState('');
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(database, 'users/' + user.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setFirstName(userData.firstName);
                    
                    if (userData.events) {
                        setEvents(userData.events);
                    }
                } else {
                    console.error('No data available');
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <Link to="/dashboard" className="list-group-item list-group-item-action active">Dashboard</Link>
                        <Link to="/create-event" className="list-group-item list-group-item-action">Create New Event</Link>
                        <Link to="/manageevent" className="list-group-item list-group-item-action">Manage Events</Link>
                        <Link to="/profile" className="list-group-item list-group-item-action">Profile</Link>
                    </div>
                </div>

                <div className="col-md-9">
                    <h2>Welcome, {firstName}!</h2>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card text-white bg-primary mb-3">
                                <div className="card-header">Total Events</div>
                                <div className="card-body">
                                    <h5 className="card-title">{events.length}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-white bg-success mb-3">
                                <div className="card-header">Upcoming Events</div>
                                <div className="card-body">
                                    <h5 className="card-title">{events.filter(event => new Date(event.date) > new Date()).length}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-white bg-danger mb-3">
                                <div className="card-header">Past Events</div>
                                <div className="card-body">
                                    <h5 className="card-title">{events.filter(event => new Date(event.date) <= new Date()).length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-header">Your Events</div>
                        <div className="card-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Event Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event, index) => (
                                        <tr key={index}>
                                            <td>{event.name}</td>
                                            <td>{event.date}</td>
                                            <td>
                                                <span className={`badge ${new Date(event.date) > new Date() ? 'badge-success' : 'badge-danger'}`}>
                                                    {new Date(event.date) > new Date() ? 'Upcoming' : 'Past'}
                                                </span>
                                            </td>
                                            <td>
                                                <Link to={`/edit-event/${event.id}`} className="btn btn-sm btn-primary">Edit</Link>
                                                <Link to={`/view-event/${event.id}`} className="btn btn-sm btn-info ml-2">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventOraganiserHomePage;
