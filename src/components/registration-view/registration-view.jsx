import React, { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const [passwordrep, setPasswordRep] = useState("");
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
      setUsernameErr('Please enter a username');
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr('Please enter at least 4 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must be at least 8 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Please enter an email address');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Please enter a valid email address');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // Send auth request to server
      axios.post('https://mymusicmovies.herokuapp.com/register', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful! Please log in.');
          window.open('/', '_self'); // opening window in current tab
        })
        .catch(response => {
          console.error(response);
          alert('Unable to register');
        });
    }
  };

  return (

    <Card className='text-white bg-secondary'>
      <Card.Body>
        <Card.Title>Create account</Card.Title>
        <Form>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' value={username} placeholder='At least 4 characters required' onChange={e => setUsername(e.target.value)} />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' value={password} placeholder='Minimun 8 characters including 1 number and 1 special character required' onChange={e => setPassword(e.target.value)} />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId='formEmail'>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} />
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>

          <Form.Group controlId='formBirthday'>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type='date' value={birthday} onChange={e => setBirthday(e.target.value)} />
            {birthdayErr && <p>{birthdayErr}</p>}
          </Form.Group>

          <br />

          <Button variant='info' type='submit' onClick={handleSubmit}>
            Register</Button>
        </Form >
      </Card.Body>
    </Card>
  );
}

// // propTypes
// RegistrationView.propTypes = {
//   register: PropTypes.shape({
//     Username: PropTypes.string,
//     Password: PropTypes.string,
//     Email: PropTypes.string,
//     // Birthday: PropTypes.string,
//     onCLick: PropTypes.func
//   })
// };