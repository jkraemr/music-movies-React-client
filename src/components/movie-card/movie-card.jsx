import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FavoriteList } from '../favoritelist-view/favoritelist-view';

import { Link } from "react-router-dom";

import "./movie-card.scss";

let imgURL = 'https://mymusicmovies.herokuapp.com/images/';

export class MovieCard extends React.Component {
  render() {
    const { movie, user } = this.props;

    return (
      <Card className='text-white bg-secondary'>
        {console.log(imgURL + movie.ImagePath)}
        <Card.Img variant="top" src={imgURL + movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="info">Learn more</Button>
          </Link>
          <FavoriteList movie={movie} user={user} />
        </Card.Body>
      </Card>
    );
  }
}