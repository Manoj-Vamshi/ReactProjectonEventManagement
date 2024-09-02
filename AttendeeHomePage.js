// src/AttendeeHomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import { setDoc, doc } from 'firebase/firestore';
import { ref, get } from 'firebase/database';


const AttendeeHomePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
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
                } else {
                    console.error('No data available');
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h1>Attendee HomePage</h1>
            <h2>Welcome {firstName}</h2>
        </div>
    );
};

export default AttendeeHomePage;