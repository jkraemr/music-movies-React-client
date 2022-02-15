import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare useState hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr('Username must contain at least 4 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must contain at least 8 characters');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send auth request to server
      axios.post('https://mymusicmovies.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (

    <Card className='text-white bg-secondary'>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
            {/* code added here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
            {/* code added here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <br />

          <Button variant="info" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}