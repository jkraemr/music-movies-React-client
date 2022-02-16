import React from "react";
import axios from "axios";

// import PropTypes from "prop-types";

import { Card, CardGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class ProfileData extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    /* Send auth request to server */
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
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
        const data = response.data;
        localStorage.removeItem("user");
        localStorage.setItem("user", this.state.username);
        alert(`Success! Profile data updated!`);
        window.open(`/users/${this.state.username}`, "_self");
      })
      .catch((response) => {
        console.error(response);
        alert("Update not possible!");
      });
  }

  // Deregister
  onDeleteUser() {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://mymusicmovies.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { username, password, email, birthday } = this.state;
    const { userData } = this.props;
    if (userData == null) return <div className="main-view" />;
    return (
      <Card className='text-white bg-secondary'>
        <Card.Body>
          <Card.Title>Hello {userData.Username} </Card.Title>
          <Card.Text>Please enter your updated user data in the fields below</Card.Text>
        </Card.Body>
        <CardGroup>
          <Card.Body>
            <Form className="font-weight-bold">
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => this.setState({
                  username: e.target.value,
                })
                }
                  placeholder={userData.Username}

                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) =>
                    this.setState({
                      password: e.target.value,
                    })
                  }
                  minLength="6"
                  placeholder="********"
                />
              </Form.Group>
              <Form.Group controlId="Email" className="mb-3">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) =>
                    this.setState({
                      email: e.target.value,
                    })
                  }
                  placeholder={userData.Email}
                />
              </Form.Group>
              <Form.Group controlId="updateBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  className="mb-3"
                  type="date"
                  value={birthday}
                  onChange={(e) =>
                    this.setState({
                      birthday: e.target.value,
                    })
                  }
                  placeholder={userData.Birthday}
                />
              </Form.Group>
              <Button variant="success" type="submit" onClick={(e) => this.handleSubmit(e)}>
                Save Changes
              </Button>

              <br />
              <br />

              <Button variant="danger" onClick={() => this.onDeleteUser()}>Delete User</Button>

            </Form>
          </Card.Body>
        </CardGroup>
      </Card>
    );
  }
}