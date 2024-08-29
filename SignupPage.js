// src/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, } from 'firebase/auth';
import { db, auth } from './firebaseConfig';
import './Styling.css';
import { setDoc, doc } from 'firebase/firestore';


const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: ''
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

            await setDoc(doc(db, 'users', user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                gender: formData.gender
            });

            console.log('User signed up and document created:', user);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <h1 className='text-center'>Sign Up</h1>

            <div class="container">
                <div class="row ">
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>

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

                            <div className='form-group'>
                                <label>Gender</label>

                                <select
                                    className='form-control'
                                    name='gender'
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=''>Select</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='other'>Other</option>
                                </select>
                            </div>
                            <button type='submit' className='btn btn-primary'>
                                Sign Up
                            </button>

                        </form>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
            </div>
        </div>



    );
};

export default SignupPage;
