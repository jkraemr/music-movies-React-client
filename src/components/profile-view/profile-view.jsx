import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import "./profile-view.scss";
import { ProfileData } from "./profile-data";
import { FavoriteMovies } from "./favorite-movies";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    // Define the initial state:
    this.state = {
      userData: null,
    };
  }
  getUser() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user"); // Contains information about the logged user
    axios
      .get(`https://mymusicmovies.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          userData: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    if (this.state.userData == null) return <div className="main-view" />;
    return (
      <Tabs defaultActiveKey="profile" transition={true} id="userPage" className="mb-3">
        <Tab eventKey="profile" title="Profile Data">
          <ProfileData userData={this.state.userData} />
        </Tab>
        <Tab eventKey="favorite" title="Favorite Movies">
          <FavoriteMovies userData={this.state.userData} />
        </Tab>
      </Tabs>
    );
  }
}