import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getMovieDetails } from '../../actions/actions';

import { Link } from 'react-router-dom';

import FavoriteList from '../favoritelist-view/favoritelist-view';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

let imgURL = 'https://mymusicmovies.herokuapp.com/images/';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className='text-white bg-secondary'>
        {console.log(imgURL + movie.ImagePath)}
        <Card.Img variant='top' src={imgURL + movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className='ellipsis'>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='info'
              onClick={() => {
                this.props.getMovieDetails(movie);
              }}
            > Learn more
            </Button>
          </Link>
          <FavoriteList movie={movie} />
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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
};

export default connect(null, { getMovieDetails })(MovieCard);
