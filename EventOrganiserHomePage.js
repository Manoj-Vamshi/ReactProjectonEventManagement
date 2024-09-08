import React, { useState, useEffect } from 'react';
import { auth, database } from './firebaseConfig';
import { ref, get } from 'firebase/database';
import './Styling.css';

const EventOrganiserProfilePage = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        role: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(database, 'users/' + user.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setProfile({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        gender: userData.gender,
                        role: userData.role
                    });
                } else {
                    console.error('No data available');
                }
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Profile Information</h2>
            <div className="card mt-4">
                <div className="card-header">User Profile</div>
                <div className="card-body">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Gender:</strong> {profile.gender}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                </div>
            </div>
        </div>
    );
};

export default EventOrganiserProfilePage;

