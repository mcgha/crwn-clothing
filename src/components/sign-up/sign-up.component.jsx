import React, { Component } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss'

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            displayName : '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if(password !== confirmPassword) {
            alert("Password don't match, try again!")
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password); 
            await createUserProfileDocument(user, {displayName});
            this.setState();
        } catch(error) {
            console.log(error);
        }

    }

    handleChange = event => {
        const { value, name } = event.target;
// dynamically setting property values
        this.setState({[name]: value})
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'> I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form'>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                        >
                    </FormInput>
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                        >
                    </FormInput>
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                        >
                    </FormInput>
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm password'
                        required
                        >
                    </FormInput>    
                    <CustomButton type='submit'> Sign Up</CustomButton>        
                </form> 
            </div>
        );
    }
}

export default SignUp;
