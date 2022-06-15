import React, { useContext, useEffect, useState } from "react";
import cookie from "react-cookies";
import Badge from "@material-ui/core/Badge";
import { BsCart } from "react-icons/bs";
import { LoginContext } from "../context/loginContext";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SimpleCart from "./SimpleCart";
let counter = 0;

const Header = () => {
  const { logoutFunction } = useContext(LoginContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const count = cookie.load("counter");
    counter = count;
  }, [show]);
  return (
    <>
      <Navbar style={{ backgroundColor: "#fff2df" }} expand="lg">
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              marginLeft: "-33rem",
              marginRight: "157%",
              color: "rgb(165, 80, 49)",
            }}
          >
            Girlish Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>

              <NavDropdown
                title="Dropdown"
                id="basic-nav-dropdown"
                style={{ marginRight: "232%" }}
              >
                <NavDropdown.Item href="/fav"> Favourite List</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                onClick={() => {
                  setShow(!show);
                }}
              >
                <Badge badgeContent={counter} color="secondary"></Badge>
                <BsCart />
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  logoutFunction();
                }}
              >
                logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {show && <SimpleCart />}
    </>
  );
};

export default Header;
