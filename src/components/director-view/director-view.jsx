import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import './director-view.scss';

let mapStateToProps = (state) => {
  return { directorDetails: state.directorDetails };
};

class DirectorView extends React.Component {
  render() {
    const { directorDetails, onBackClick } = this.props;

    return (
      <Card className='text-white bg-secondary'>
        <Card.Body>
          <Card.Title>{directorDetails.Name}</Card.Title>
          <Card.Text>{directorDetails.Bio}</Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem className='text-white bg-secondary'>Birth: {directorDetails.Birth}</ListGroupItem>
        </ListGroup>
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

DirectorView.propTypes = {
  directorDetails: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
  }),
  onBackClick: PropTypes.func,
};

export default connect(mapStateToProps)(DirectorView);
