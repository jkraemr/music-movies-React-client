import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import Button from 'react-bootstrap/Button';

import './favoritelist-view.scss';

const mapStateToProps = (state) => {
  return { userData: state.userData };
};

class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    // Define initial state:
    this.state = {
      add: ' ',
      delete: 'd-none',
    };
  }

  checkFavoriteList() {
    const foundMovie = this.props.userData.user.FavoriteMovies.find(
      (element) => element === this.props.movie._id
    );
    if (foundMovie) {
      this.setState({
        add: 'd-none',
        delete: ' ',
      });
    }
  }

  addMovieToFavoriteList() {
    this.setState({
      add: 'd-none',
      delete: ' ',
    });
    axios
      .post(
        `https://mymusicmovies.herokuapp.com/users/${this.props.userData.user.Username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${this.props.userData.token}` },
        }
      )
      .then((response) => {
        let addFavoriteMovie = { user: response.data, token: this.props.userData.token };
        this.props.setUser(addFavoriteMovie);
      })
      .catch((response) => {
        console.error(response);
      });
  }

  removeMoviefromFavoriteList() {
    this.setState({
      add: ' ',
      delete: 'd-none',
    });
    axios
      .delete(
        `https://mymusicmovies.herokuapp.com/users/${this.props.userData.user.Username}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${this.props.userData.token}` },
        }
      )
      .then((response) => {
        let removeFavoriteMovie = { user: response.data, token: this.props.userData.token };
        this.props.setUser(removeFavoriteMovie);
      })
      .catch((response) => {
        console.error(response);
      });
  }
  componentDidMount() {
    this.checkFavoriteList();
  }

  render() {
    return (
      <>
        {' '}
        <Button
          className={`${this.state.add}`}
          variant='success'
          onClick={() => this.addMovieToFavoriteList()}
        >
          &#9825;
        </Button>
        <Button
          className={`${this.state.delete}`}
          variant='danger'
          onClick={() => this.removeMoviefromFavoriteList()}
        >
          &#9829;
        </Button>
      </>
    );
  }
}

FavoriteList.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
  }),
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
};

export default connect(mapStateToProps, { setUser })(FavoriteList);
