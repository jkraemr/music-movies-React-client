import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Navbar, Container, Nav } from 'react-bootstrap';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';


import './navbar-view.scss';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter, userData: state.userData };
};

function NavbarView(props) {
  const { userData, visibilityFilter } = props;

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  isAuth = () => {
    if (typeof window == 'undefinded') {
      return false;
    }
    if (Object.keys(userData).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Navbar className='nav-bar-cont' className='main-nav' sticky='top' bg='dark' expand='lg' variant='dark' className='mb-3'>
      <Container >
        <Navbar.Brand className='navbar-logo' href='/'>
          <h1>myMusicMovies</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {isAuth() && (
              <Nav.Link href={`/`}>
                🎦 Movies
              </Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href={`/favorites`}>
                &#9829; Favorites
              </Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href={`/account`}>

                &#119585; Account
                {/* {userData.user.Username} */}
              </Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link
                className='handCursor'
                onClick={() => {
                  this.onLoggedOut();
                }}
              >

                &#9211; Logout
              </Nav.Link>
            )}
            {!isAuth() && <Nav.Link href='/register'>
              &#10003; Create Account</Nav.Link>}
            {!isAuth() && <Nav.Link href='/'>
              &#9211; Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavbarView.propTypes = {
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
  visibilityFilter: PropTypes.string,
};

export default connect(mapStateToProps)(NavbarView);
