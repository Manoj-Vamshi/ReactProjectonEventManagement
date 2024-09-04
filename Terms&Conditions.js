import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { database, auth } from './firebaseConfig';
import './Styling.css';
import { setDoc, doc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';


const Terms = () => {
    return (
        <div>

        <h1>Terms and Conditions</h1>
        
    </div>



    );
};

export default Terms;













