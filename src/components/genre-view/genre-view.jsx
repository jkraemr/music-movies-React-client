import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './genre-view.scss';

let mapStateToProps = (state) => {
  return { genreDetails: state.genreDetails };
};

class GenreView extends React.Component {
  render() {
    const { genreDetails, onBackClick } = this.props;

    return (
      <Card className='text-white bg-secondary'>
        <Card.Body>
          <Card.Title>{genreDetails.Name}</Card.Title>
          <Card.Text>{genreDetails.Description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Button variant='info' onClick={() => {
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

GenreView.propTypes = {
  genreDetails: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }),
  onBackClick: PropTypes.func,
};

export default connect(mapStateToProps)(GenreView);
