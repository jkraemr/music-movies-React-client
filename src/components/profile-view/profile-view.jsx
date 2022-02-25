import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser, setMovies } from '../../actions/actions';

import { Link } from 'react-router-dom';

import { Accordion } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { Card, CardGroup, OverlayTrigger, Popover } from 'react-bootstrap';

import './profile-view.scss';


const mapStateToProps = (state) => {
  return { userData: state.userData };
};

class ProfileView extends React.Component {
  // Define initial state:
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: '',
    };
  }
  deleteAccount() {
    axios
      .delete(
        `https://mymusicmovies.herokuapp.com/users/${this.props.userData.user.Username}`,
        {
          headers: { Authorization: `Bearer ${this.props.userData.token}` },
        }
      )
      .then((response) => {
        this.props.setUser({});
        this.props.setMovies({});

        alert('Gone forever: Your accoount has been deleted.');
      })
      .catch((response) => {
        console.error(response);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Send auth request to server
    let user = this.props.userData.user.Username;
    let token = this.props.userData.token;
    axios
      .patch(
        `https://mymusicmovies.herokuapp.com/users/${user}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        let updateUserData = {
          ...this.props.userData,
        };
        updateUserData.user.Username = this.state.username;
        updateUserData.user.Email = this.state.email;
        updateUserData.user.Birthday = this.state.birthday;
        this.props.setUser(updateUserData);

        alert(`Success! Your account data have been updated.`);
        window.open(`/users/${this.state.username}`, '_self');
      })
      .catch((response) => {
        console.error(response);
        alert('Something went wrong :( Please try again.');
      });
  }
  render() {
    const { username, password, email, birthday } = this.state;
    const { userData } = this.props;
    const popover = (
      <Popover id='popover-basic'>
        <Popover.Header as='h3'>Are you sure?</Popover.Header>
        <Popover.Body>
          Your account will be gone forever 😱
          <br />
          <br />
          <Link to={'/'}>
            <Button variant='danger' type='button' onClick={() => this.deleteAccount()}
            >
              Yes DELETE
            </Button>
          </Link>
          <Button variant='secondary' type='button' onClick={() => {
            window.location.reload(false);
          }}
          >
            No CANCEL
          </Button>
        </Popover.Body>
      </Popover>
    );
    if (userData == null) return <div className='main-view' />;
    return (
      <Card className='text-white bg-secondary'>
        <Card.Body>
          <Card.Title>Hello {userData.user.Username} </Card.Title>
          <br />
          <Card.Text>Here are your account details:</Card.Text>
          Username: <p>{userData.user.Username}</p>
          Email: <p>{userData.user.Email}</p>
          Birthday: <p>{userData.user.Birthday}</p>

          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Edit Account</Accordion.Header>
              <Accordion.Body>

                <Form>
                  <Form.Group controlId='formUsername'>
                    <Form.Label>New username:</Form.Label>
                    <Form.Control
                      type='text' value={username} onChange={(e) =>
                        this.setState({
                          username: e.target.value,
                        })
                      }
                      placeholder={userData.user.Username}
                    />
                  </Form.Group>

                  <Form.Group controlId='formPassword'>
                    <Form.Label>New password:</Form.Label>
                    <Form.Control
                      type='password' value={password} onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                        })
                      }
                      minLength='8'
                      placeholder='********'
                    />
                  </Form.Group>

                  <Form.Group controlId='Email' className='mb-3'>
                    <Form.Label>New email:</Form.Label>
                    <Form.Control
                      type='email' value={email} onChange={(e) =>
                        this.setState({
                          email: e.target.value,
                        })
                      }
                      placeholder={userData.user.Email}
                    />
                  </Form.Group>

                  <Form.Group controlId='updateBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      className='mb-3'
                      type='date'
                      value={birthday}
                      onChange={(e) =>
                        this.setState({
                          birthday: e.target.value,
                        })
                      }
                      placeholder={userData.user.Birthday}
                    />
                  </Form.Group>

                  <Button type='submit' variant='info' onClick={(e) => this.handleSubmit(e)}>
                    Save Changes
                  </Button>
                  <br />
                  <br />
                </Form>


              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
          <div className='text-secondary'>
            <OverlayTrigger trigger='click' placement='top' overlay={popover}>
              <Button variant='danger' type='button'>
                Delete Account
              </Button>
            </OverlayTrigger>
          </div>


        </Card.Body>
      </Card>
    );
  }
}

ProfileView.propTypes = {
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
  setMovies: PropTypes.func,
};

export default connect(mapStateToProps, { setUser, setMovies })(ProfileView);
