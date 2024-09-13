import React, { useState, useEffect } from 'react';
import { database, auth } from './firebaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Styling.css';

const ADMIN_USER_IDS = ['ar.revathi031@gmail.com'];

const AdminHomePage = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthorization = () => {
            const user = auth.currentUser;

            if (user && ADMIN_USER_IDS.includes(user.email)) {
                setIsAuthorized(true);
                fetchData();
            } else {
                setIsAuthorized(false);
                navigate('/restricted');
            }
        };

        const fetchData = async () => {
            const usersRef = ref(database, 'users');
            onValue(usersRef, (snapshot) => {
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    setUsers(Object.entries(usersData).map(([id, user]) => ({ id, ...user })));
                } else {
                    setUsers([]);
                }
            });

            const eventsRef = ref(database, 'events');
            onValue(eventsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const eventsData = snapshot.val();
                    setEvents(Object.entries(eventsData).map(([id, event]) => ({ id, ...event })));
                } else {
                    setEvents([]);
                }
            });

            setLoading(false);
        };

        checkAuthorization();
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/Login');
        } catch (error) {
            console.error('Sign Out Error:', error);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            await remove(ref(database, `events/${eventId}`));
            alert('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await remove(ref(database, `users/${userId}`));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthorized) {
        return <p>You are not authorized to view this page.</p>;
    }

    return (
        <div className="app-container">
            <header className="admin-header">
                <div className="header-title">
                    <h1 className="display-4">Admin Dashboard</h1>
                </div>
                <button
                    onClick={handleSignOut}
                    className="btn btn-signout"
                >
                    Sign Out
                </button>
            </header>

            <div className="main-content">
                <div className="container">
                    <h2 className="text-center">Users</h2>
                    <div className="row">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user.id} className="col-lg-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{user.firstName} {user.lastName}</h5>
                                            <p className="card-text">Email: {user.email}</p>
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="btn btn-danger"
                                            >
                                                Delete User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>

                    <hr />

                    <h2 className="text-center">Events</h2>
                    <div className="row">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <div key={event.id} className="col-lg-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{event.name}</h5>
                                            <p className="card-text">Date: {event.date}</p>
                                            <p className="card-text">Location: {event.location}</p>
                                            <button
                                                onClick={() => deleteEvent(event.id)}
                                                className="btn btn-danger"
                                            >
                                                Delete Event
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No events found.</p>
                        )}
                    </div>
                </div>
            </div>
            </div>
    );
};

export default AdminHomePage;
