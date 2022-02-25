import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import MovieCard from '../movie-card/movie-card';

import './movies-list.scss';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter, movies: state.movies };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className='main-view' />;

  return (
    <>
      <Container className='search-bar-cont'>
        <Row className='search-bar-row'>
          <Col lg={3} className='search-bar-col'>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
          </Col>
        </Row>
      </Container>
      <Row>
        {filteredMovies.map((movie) => (
          <Col sm={12} md={6} lg={4} key={movie._id}>
            <CardGroup className='cardStyle'>
              <MovieCard movie={movie} />
            </CardGroup>
          </Col>
        ))}
      </Row>
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  visibilityFilter: PropTypes.string,
};

export default connect(mapStateToProps)(MoviesList);
