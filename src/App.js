import "./App.css";
import Layout from "./components/Layout";
import Products from "./pages/products";
import Cart from "./pages/cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Products />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
