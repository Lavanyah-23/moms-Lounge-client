import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { FaHome, FaComments, FaLightbulb, FaStore, FaUser, FaRobot } from "react-icons/fa";

export default function Navigation() {
  const token = useSelector((state) => state.user.token);
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-3" sticky="top">
      <Navbar.Brand as={NavLink} to="/" className="fw-bold text-primary">
        Moms Lounge
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="me-auto" style={{ width: "100%" }}>
          <NavbarItem path="/" linkText={<><FaHome /> Home</>} />
          <NavbarItem path="/forum" linkText={<><FaComments /> Forum</>} />
          <NavbarItem path="/prompt-library" linkText={<><FaLightbulb /> Prompt Library</>} />
          <NavbarItem path="/marketplace" linkText={<><FaStore /> Marketplace</>} />
          <NavbarItem path="/my-posts" linkText={<><FaUser /> My Posts</>} />
          <NavbarItem path="/ask-ai" linkText={<><FaRobot /> Ask AI</>} />
        </Nav>
        <Nav>{loginLogoutControls}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
