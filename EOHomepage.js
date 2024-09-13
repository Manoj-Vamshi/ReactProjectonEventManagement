import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, database } from './firebaseConfig';
import { ref, onValue, get } from 'firebase/database';
import { signOut } from 'firebase/auth'; 
import './Styling.css';
import { UserContext } from './UserContext';

const EOHomepage = () => {
    const [firstName, setFirstName] = useState('');
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const { userId, loading } = useContext(UserContext);

    useEffect(() => {
        if (loading) return;

        if (!userId) {
            setEvents([]);
            return;
        }

        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = ref(database, 'users/' + user.uid);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setFirstName(userData.firstName || 'User');

                        const eventsRef = ref(database, `events`);
                        const unsubscribe = onValue(eventsRef, (snapshot) => {
                            if (snapshot.exists()) {
                                const eventsData = snapshot.val();
                                
                                const filteredEvents = Object.keys(eventsData)
                                    .filter(key => eventsData[key].createdBy === userId)
                                    .map(key => ({
                                        id: key,
                                        ...eventsData[key]
                                    }))
                                    .map(event => ({
                                        ...event,
                                        ticketPrice: Number(event.ticketPrice)  
                                    }));
                                setEvents(filteredEvents);
                            } else {
                                setEvents([]);
                            }
                        });

                        return () => unsubscribe();
                    } else {
                        console.error('No user data available');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId, loading]);

    const getUpcomingEventsCount = () => {
        return events.filter(event => new Date(event.date) > new Date()).length;
    };

    const getPastEventsCount = () => {
        return events.filter(event => new Date(event.date) <= new Date()).length;
    };

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/Login'); 
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <div className="list-group">
                        <Link to="/dashboard" className="list-group-item list-group-item-action active">Dashboard</Link>
                        <Link to="/create-event" className="list-group-item list-group-item-action">Create New Event</Link>
                        <Link to="/manage-events" className="list-group-item list-group-item-action">Manage Events</Link>
                        <Link to="/profile" className="list-group-item list-group-item-action">Profile</Link>
                        <button onClick={handleLogout} className="list-group-item list-group-item-action">Logout</button>
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
                                    <h5 className="card-title">{getUpcomingEventsCount()}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-white bg-danger mb-3">
                                <div className="card-header">Past Events</div>
                                <div className="card-body">
                                    <h5 className="card-title">{getPastEventsCount()}</h5>
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
                                        <th scope="col">Ticket Price</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.length > 0 ? (
                                        events.map((event) => (
                                            <tr key={event.id}>
                                                <td>{event.name}</td>
                                                <td>{new Date(event.date).toLocaleDateString()}</td>
                                                <td>${event.ticketPrice.toFixed(2)}</td>  
                                                <td>
                                                    <span
                                                        className={`badge ${new Date(event.date) > new Date() ? 'badge-success' : 'badge-danger'}`}
                                                        style={{ color: new Date(event.date) > new Date() ? 'green' : 'red' }}
                                                    >
                                                        {new Date(event.date) > new Date() ? 'Open' : 'Closed'}
                                                    </span>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No events found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EOHomepage;
