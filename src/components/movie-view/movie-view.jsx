import React from "react";
// import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import { Link } from "react-router-dom";

import "./movie-view.scss";

let imgURL = 'https://mymusicmovies.herokuapp.com/images/';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className='text-white bg-secondary'>
        <Card.Img
          variant="top"
          src={imgURL + movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        {/* list-group-flush to remove some borders and rounded corners to render list group items edge-to-edge in a parent container (e.g., cards). */}
        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-white bg-secondary">
            Genre:
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button className="btn-listGroupItem" variant="info">{movie.Genre.Name}</Button>
            </Link>
          </ListGroupItem>
          <ListGroupItem className="text-white bg-secondary">
            Director:
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button className="btn-listGroupItem" variant="info"> {movie.Director.Name}</Button>
            </Link>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant="info"
            // className="button-block"
            onClick={() => { onBackClick() }}>
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}