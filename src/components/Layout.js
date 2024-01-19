import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <MDBContainer fluid className="p-0">
      <Navbar />
      {children}
    </MDBContainer>
  );
}
