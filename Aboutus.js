import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import { setDoc, doc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';


const Aboutus = () => {
    return (
        <div>

        <h1>About Us</h1>
        
    </div>



    );
};

export default Aboutus;













