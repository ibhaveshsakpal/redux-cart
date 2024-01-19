import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function Card(props) {
  const { title, price, img } = props.props;

  const dispatch = useDispatch();

  return (
    <MDBCard className="d-flex">
      <MDBCardImage src={img} position="top" alt="..." />
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <MDBCardText className="custom-text">${price}</MDBCardText>
        <MDBBtn onClick={() => dispatch(addToCart(props.props))}>
          Add to Cart
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
