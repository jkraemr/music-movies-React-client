import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import './login-view.scss';

let mapStateToProps = (state) => {
  return { userData: state.userData };
};

function LoginView(props) {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    // Send auth request to server
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post('https://mymusicmovies.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.setUser(data);
          props.onLoggedIn();
        })
        .catch((e) => {
          alert('No such user or password 😭 Please try again 💪');
          console.log(e);
        });
    }
  };

  return (

    <Card className='text-white bg-secondary'>
      <Card.Body>
        <Card.Title>Log into your account</Card.Title>
        <Form>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type='text' value={username} placeholder='Your username' onChange={(e) => setUsername(e.target.value)}
            />
            {usernameErr && <Alert variant='info'>{usernameErr}</Alert>}
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control type='password' placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErr && <Alert variant='info'>{passwordErr}</Alert>}
          </Form.Group>

          <Button variant='success' type='submit' onClick={handleSubmit}>
            Log In
          </Button>

          <br />
          <br />

          <Card.Title>No account yet?</Card.Title>
          <Link to={`/register`}>
            <Button variant='info' type='button'>
              Create Account
            </Button>
          </Link>
        </Form>
      </Card.Body>
    </Card >
  );
}

LoginView.propTypes = {
  userData: PropTypes.shape({
    User: PropTypes.shape({
      _id: PropTypes.string,
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,
      FavoriteMovies: PropTypes.array,
    }),
    token: PropTypes.string,
  }),
  setUser: PropTypes.func,
  onLoggedIn: PropTypes.func,
};

export default connect(mapStateToProps, { setUser })(LoginView);
