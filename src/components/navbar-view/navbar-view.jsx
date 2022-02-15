import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import "./navbar-view.scss";

export function NavbarView({ user }) {

  // Sign out method
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  // Token method
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  // ul
  return (
    <Navbar className="text-white" sticky="top" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">myMusicMovies</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* Hide sign up if token exists */}
            {isAuth() && (
              <Nav.Link href={'/users/${user}'}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button className="navbar-view-btn" variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            )}
            {!isAuth() && (
              <Nav.Link href="/">Login</Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse >
      </Container >
    </Navbar>
  );

}