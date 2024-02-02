import "./styles/css/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ProductsList from "./ProductsList";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
