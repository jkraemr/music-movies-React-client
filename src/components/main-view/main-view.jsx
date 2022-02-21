import React from 'react';
import axios from 'axios';

import FavoriteMovies from '../favoritemovies-view/favoritemovies-view';
import ProfileView from '../profile-view/profile-view';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
// MovieCard not needed anymore as imported via / used in the MoviesList component
// import { MovieCard } from '../movie-card/movie-card';

import LoginView from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import NavbarView from '../navbar-view/navbar-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

let mapStateToProps = (state) => {
  return { movies: state.movies, userData: state.userData };
};

class MainView extends React.Component {

  componentDidMount() {
    if (Object.keys(this.props.userData).length !== 0) {
      this.getMovies(this.props.userData.token);
    }
  }

  onLoggedIn() {
    if (Object.keys(this.props.userData).length !== 0) this.getMovies(this.props.userData.token);
  }

  getMovies(token) {
    axios
      .get('https://mymusicmovies.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign result to state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    this.props.setUser({});
  }

  render() {
    let { userData, movies } = this.props;

    return (
      <Router>
        <NavbarView />
        <Container className='main-view-cont'>
          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              if (Object.keys(userData).length === 0)
                return (
                  <Col md={6}>
                    <LoginView onLoggedIn={() => this.onLoggedIn()} />
                  </Col>
                );

              if (movies.length === 0)
                return <div className='main-view' />;
              return <MoviesList />;
            }}
            />

            <Route
              path='/register'
              render={() => {
                if (Object.keys(userData).length !== 0) return <Redirect to='/' />;
                return (
                  <Col md={6}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path='/account'
              render={() => {
                return (
                  <Col>
                    <ProfileView />
                  </Col>
                );
              }}
            />

            <Route
              path='/favorites'
              render={() => {
                return (
                  <Col>
                    <FavoriteMovies />
                  </Col>
                );
              }}
            />

            <Route
              path='/movies/:movieId' render={({ history }) => {
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col md={6}>
                    <MovieView onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />

            <Route
              path='/directors/:name'
              render={({ history }) => {
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col md={6}>
                    <DirectorView onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />

            <Route
              path='/genres/:name'
              render={({ history }) => {
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col md={6}>
                    <GenreView onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
