import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  getTotalPrice,
  increaseQuantity,
  removeFromCart,
} from "../features/cartSlice";
import { loadStripe } from "@stripe/stripe-js";

export default function CartPage() {
  const { carts, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const handlePayment = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API);
    if (!totalPrice) {
      return;
    }
    if (!stripe) {
      return;
    }
    try {
      const paymentObj = {
        product: {
          name: "test",
          price: totalPrice,
          quantity: totalQuantity,
          redirect_to: "http://localhost:3000",
        },
      };

      const fetchPayment = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentObj),
        }
      );
      const res = await fetchPayment.json();
      const result = stripe.redirectToCheckout({
        sessionId: res?.id,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalPrice());
  }, [carts]);

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Cart - {carts.length} items
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {carts.map((item) => (
                  <MDBRow>
                    <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                      <MDBRipple
                        rippleTag="div"
                        rippleColor="light"
                        className="bg-image rounded hover-zoom hover-overlay"
                      >
                        <img src={item.img} className="w-100" alt="..." />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                    </MDBCol>

                    <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                      <p>
                        <strong>{item.title}</strong>
                      </p>

                      <span onClick={() => dispatch(removeFromCart(item.id))}>
                        <MDBTooltip
                          wrapperProps={{ size: "sm" }}
                          wrapperClass="me-1 mb-2"
                          title="Remove item"
                        >
                          <MDBIcon fas icon="trash" />
                        </MDBTooltip>
                      </span>
                      <MDBTooltip
                        wrapperProps={{ size: "sm", color: "danger" }}
                        wrapperClass="me-1 mb-2"
                        title="Move to the wish list"
                      >
                        <MDBIcon fas icon="heart" />
                      </MDBTooltip>
                    </MDBCol>
                    <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <MDBBtn
                          className="px-3 me-2"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          <MDBIcon fas icon="minus" />
                        </MDBBtn>

                        <MDBInput
                          defaultValue={1}
                          min={0}
                          type="number"
                          label="Quantity"
                          value={item.quantity}
                        />

                        <MDBBtn
                          className="px-3 ms-2"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>${item.price}</strong>
                      </p>
                    </MDBCol>
                    <hr className="my-4" />
                  </MDBRow>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Total Quantity
                    <span>{totalQuantity}</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                    </div>
                    <span>
                      <strong>${totalPrice}</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>

                <MDBBtn block size="lg" onClick={handlePayment}>
                  Go to checkout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
