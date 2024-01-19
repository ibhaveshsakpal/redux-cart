import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Card from "./../components/Card";
import { useSelector } from "react-redux";
import Carousel from "../components/Carousel";

function Products() {
  const data = useSelector((state) => state.cart.items);

  return (
    <MDBContainer className="pt-5">
      <Carousel />
      <MDBRow>
        {data.map((data, key) => (
          <MDBCol key={key} md={4} lg={3}>
            <Card props={data} />
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default Products;
