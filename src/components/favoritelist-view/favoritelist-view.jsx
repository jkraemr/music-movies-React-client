import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

export class FavoriteList extends React.Component {
  constructor(props) {
    super(props);
    // Define the initial state:
    this.state = {
      add: " ",
      delete: "d-none",
    };
  }
  checkFavoriteList(user, movieId) {
    let token = localStorage.getItem("token");
    axios
      .get(`https://mymusicmovies.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const foundMovie = response.data.FavoriteMovies.find((element) => element === movieId);
        if (foundMovie) {
          this.setState({
            add: "d-none",
            delete: " ",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  addMovieToFavoriteList(user, movie) {
    let token = localStorage.getItem("token");
    this.setState({
      add: "d-none",
      delete: " ",
    });
    axios
      .post(
        `https://mymusicmovies.herokuapp.com/users/${user}/movies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
      })
      .catch((response) => {
        console.error(response);
      });
  }

  removeMoviefromFavoriteList(user, movie) {
    let token = localStorage.getItem("token");
    this.setState({
      add: " ",
      delete: "d-none",
    });
    axios
      .delete(
        `https://mymusicmovies.herokuapp.com/users/${user}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;
      })
      .catch((response) => {
        console.error(response);
      });
  }
  componentDidMount() {
    this.checkFavoriteList(this.props.user, this.props.movie._id);
  }

  render() {
    const { movie, user } = this.props;

    return (
      <>
        {" "}
        <Button
          className={`${this.state.add}`}
          variant="success"
          onClick={() => this.addMovieToFavoriteList(user, movie)}
        >
          &#9825;
        </Button>
        <Button
          className={`${this.state.delete}`}
          variant="danger"
          onClick={() => this.removeMoviefromFavoriteList(user, movie)}
        > &#128420;
        </Button>
      </>
    );
  }
}