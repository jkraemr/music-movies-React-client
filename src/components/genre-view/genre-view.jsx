import React from "react";
import axios from 'axios';

// import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from 'react-router-dom';
import { Container, Card, Button, Row } from 'react-bootstrap';


import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <Card className='text-white bg-secondary'>
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Button variant='info' onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}