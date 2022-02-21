import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import './registration-view.scss';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Declare useState hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr('Username must contain at least 4 characters');
      isReq = false;
    } else {
      setUsernameErr('');
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must contain at least 8 characters');
      isReq = false;
    } else {
      setPasswordErr('');
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email address');
      isReq = false;
    } else {
      setEmailErr('');
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send auth request to server
      axios.post('https://mymusicmovies.herokuapp.com/register', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
        .then((response) => {
          const data = response.data;
          alert('Registration successful! Please log in.');
          window.open('/', '_self'); // opening window in current tab
        })
        .catch((response) => {
          console.error(response);
          alert('Something went wrong. Please try again.');
        });
    }
  };

  return (

    <Card className='text-white bg-secondary'>
      <Card.Body>
        <Card.Title>Create Account</Card.Title>
        <Form>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' value={username} placeholder='Enter a username' onChange={(e) => setUsername(e.target.value)}
            />
            {usernameErr && <Alert variant='info'>{usernameErr}</Alert>}
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' value={password} onChange={(e) => setPassword(e.target.value)}
              required minLength='8'
              placeholder='Enter a password (8 characters required)'
            />
            {passwordErr && <Alert variant='info'>{passwordErr}</Alert>}
          </Form.Group>

          <Form.Group controlId='Email'>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='email' value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email' required
            />
            {emailErr && <Alert variant='info'>{emailErr}</Alert>}
          </Form.Group>

          <Form.Group controlId='updateBirthday'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control type='date' value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>

          <br />

          <Button type='submit' variant='success' onClick={handleSubmit}>
            Create Account
          </Button>

          <br />
          <br />

          <Card.Title>Already have an account?</Card.Title>
          <Link to={'/'}>
            <Button variant='info' type='button'>
              Go to Login
            </Button>
          </Link>
        </Form>
      </Card.Body>
    </Card>
  );
}
