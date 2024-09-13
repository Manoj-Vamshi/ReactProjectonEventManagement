import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { database, auth } from './firebaseConfig';
import gimage from './gimage.png';
import './Styling.css';
import { setDoc, doc } from 'firebase/firestore';
import { ref, set, get } from 'firebase/database';



const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        role: ''
    });

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await set(ref(database, 'users/' + user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                gender: formData.gender,
                role: formData.role
            });

            console.log('User signed up and document created:', user);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed. Please try again.');
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const fullName = user.displayName ? user.displayName.split(' ') : [];
            const firstName = fullName[0] || '';
            const lastName = fullName[1] || '';
            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);

            if (!snapshot.exists()) {
                await set(userRef, {
                    firstName: firstName,
                    lastName: lastName,
                    email: user.email,
                    gender: '',
                    role: 'attendee',
                });
            }

            console.log('User signed up with Google:', user);
            navigate('/attendeehomepage');
        } catch (error) {
            console.error('Error during Google signup:', error);
            alert('Google Signup failed. Please try again.');
        }
    };


    return (
        <div className="signup-container">
    <div className="form-wrapper">
        <h1 className='text-center'>Sign Up</h1>

        <form onSubmit={handleSignup}>
            <div className='form-group'>
                <label>First Name</label>
                <input
                    type='text'
                    className='form-control'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label>Last Name</label>
                <input
                    type='text'
                    className='form-control'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label>Email</label>
                <input
                    type='email'
                    className='form-control'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input
                    type='password'
                    className='form-control'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Gender</label>
                <div className="gender-group">
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                        type="radio"
                        id="custom"
                        name="gender"
                        value="Custom"
                        checked={formData.gender === 'Custom'}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="custom">Others</label>
                </div>
            </div>

            <div className='form-group'>
                <label>Role</label>
                <select
                    className='form-control'
                    name='role'
                    value={formData.role}
                    onChange={handleInputChange}
                    required>
                    <option value=''>Select</option>
                    <option value='eventorganizer'>Event Organizer</option>
                    <option value='attendee'>Attendee</option>
                    <option value='admin'>Admin</option>
                </select>
            </div>

            <div className="button-group-signup">
                <button type='submit' className='signup-btn-custom'>
                    Sign Up
                </button>
                <button type='button' className='google-signup-btn' onClick={handleGoogleSignup}>
                    <img src={gimage} alt='Google Logo' className='google-logo-icon' />
                </button>
                </div>
        </form>
    </div>
</div>




    );
};

export default SignupPage;
