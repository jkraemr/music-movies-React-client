import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from "../profile-view/profile-view";

import "./main-view.scss";

import CardGroup from "react-bootstrap/CardGroup";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

  constructor() {
    super();
    // code executed right when the component is created in the memory
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // setSelectedMovie(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  // When a user successfully logs in, this function updates the `user` property in state to that *particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null
  //   });
  // }
  // <button onClick={() => { this.onLoggedOut() }}>Logout</button>

  getMovies(token) {
    axios.get('https://mymusicmovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    return (
      <Router>
        <NavbarView />
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            // If there is no user, the LoginView is rendered, If there is a user logged in, the user details are passed as a prop to the LoginView
            if (!user)
              return (
                <Col md={6}>
                  <LoginView
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  // userRegistration={(newUser) => this.userRegistration(newUser)}
                  />
                </Col>
              );

            // Before the movies have been loaded
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map((movie) => (
              <Col md={6} lg={4} xl={3} key={movie._id}>
                <CardGroup>
                  <MovieCard movie={movie} user={user} />
                </CardGroup>
              </Col>
            ));
          }}
          />

          <Route path="/register" render={() => {
            // User registration to create a new user account
            if (user) return <Redirect to="/" />;
            return (
              <Col md={6}>
                <RegistrationView />
              </Col>
            );
          }}
          />

          <Route path="/profile" render={() => {
            return (
              <Col>
                <ProfileView />
              </Col>
            );
          }}
          />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col>
                <MovieView movie={movies.find((movie) => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            );
          }}
          />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col>
                <DirectorView director={movies.find((movie) => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            );
          }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col>
                  <GenreView
                    genre={movies.find((movie) => movie.Genre.Name === match.params.name).Genre}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

        </Row>
      </Router>
    );
  }

}