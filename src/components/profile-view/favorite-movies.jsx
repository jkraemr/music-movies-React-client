import React from "react";
// import PropTypes from "prop-types";
import { CardGroup } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";

import axios from "axios";

export class FavoriteMovies extends React.Component {
  constructor(props) {
    super(props);
    // Define the initial state:
    this.state = {
      movies: [],
    };
  }

  getMovies() {
    let token = localStorage.getItem("token");
    axios
      .get("https://mymusicmovies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { userData } = this.props;
    const { movies } = this.state;
    if (movies.length === 0) return <div>Loading...</div>;
    if (userData.FavoriteMovies.length === 0) return <div>No Favorites saved yet</div>;
    return (
      <Row className="main-view justify-content-center">
        {userData.FavoriteMovies.length > 0 &&
          movies.map((movie) => {
            if (movie._id === userData.FavoriteMovies.find((fav) => fav === movie._id)) {
              return (
                <Col sm={6} xs={12} key={movie._id}>
                  <CardGroup className="cardStyle">
                    <MovieCard movie={movie} user={userData.Username} />
                  </CardGroup>
                </Col>
              );
            }
          })}
      </Row>
    );
  }
}