import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function App() {
  const cartCount = useSelector((state) => state.cart.carts);

  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <Link to="/" style={{ color: "black" }}>
            Redux Cart
          </Link>
        </MDBNavbarBrand>
        <MDBNavbarLink>
          <Link to="/" style={{ color: "black" }}>
            All Products
          </Link>
        </MDBNavbarLink>
        <Link to="/cart" style={{ color: "black" }}>
          <MDBBtn color="secondary">Cart ({cartCount.length})</MDBBtn>
        </Link>
      </MDBContainer>
    </MDBNavbar>
  );
}
