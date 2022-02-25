import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getGenreDetails, getDirectorDetails } from '../../actions/actions';

import { Link } from 'react-router-dom';

// import FavoriteList from '../favoritelist-view/favorite-list-view';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import './movie-view.scss';

let imgURL = 'https://mymusicmovies.herokuapp.com/images/';

let mapStateToProps = (state) => {
  return { movieDetails: state.movieDetails };
};

class MovieView extends React.Component {
  render() {
    const { movieDetails, onBackClick } = this.props;
    return (
      <Card className='text-white bg-secondary'>
        <Card.Img variant='top' src={imgURL + movieDetails.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movieDetails.Title}</Card.Title>
          <Card.Text>{movieDetails.Description}</Card.Text>
        </Card.Body>
        {/* list-group-flush to remove some borders and rounded corners to render list group items edge-to-edge in a parent container (e.g., cards). */}
        <ListGroup className='list-group-flush'>
          <ListGroupItem className='text-white bg-secondary'>
            Genre:
            <Link to={`/genres/${movieDetails.Genre.Name}`}>
              <Button className='btn-listGroupItem' variant='info'
                onClick={() => {
                  this.props.getGenreDetails(movieDetails.Genre);
                }}
              >
                {movieDetails.Genre.Name}
              </Button>
            </Link>
          </ListGroupItem>
          <ListGroupItem className='text-white bg-secondary'>
            Director:
            <Link to={`/directors/${movieDetails.Director.Name}`}>
              <Button className='btn-listGroupItem' variant='info'
                onClick={() => {
                  this.props.getDirectorDetails(movieDetails.Director);
                }}
              >
                {movieDetails.Director.Name}
              </Button>
            </Link>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant='info'
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movieDetails: PropTypes.shape({
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
  onBackClick: PropTypes.func,
};

export default connect(mapStateToProps, { getDirectorDetails, getGenreDetails })(MovieView);
