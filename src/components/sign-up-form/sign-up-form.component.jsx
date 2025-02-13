import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    // console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();

        //check if passwords match.
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Create user with email and password
            const authResponse = await createAuthUserWithEmailAndPassword(email, password);
            console.log('auth response: ', authResponse);
            // const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // console.log(user);
            const { user } = authResponse;

            // Create user document in Firestore
            await createUserDocumentFromAuth({ ...user, displayName });

            // Reset form fields
            setFormFields(defaultFormFields);

            alert('Sign-up successful');
        } catch (error) {
            console.log('Error during sign-up', error);
            alert(`Error during sign-up: ${error.message}`);
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={(event) => handleSubmit(event)} >
                <label>Display Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />

                <label>Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />
                <button type="submit" >Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;