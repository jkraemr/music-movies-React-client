import React from "react";
// import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className='text-white bg-secondary'>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-white bg-secondary">
            Birth: {director.Birth}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant='info' onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}