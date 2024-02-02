import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./reducers/productsReducer";
import Product from "./Product";

function ProductsList() {
  const dispatch = useDispatch();
  const { items = [], isLoading } = useSelector(({ products }) => products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="products-list">
      {isLoading ? (
        "Loading"
      ) : (
        <div className="wrapper">
          <h1 className="store-title">CPB-NEW-DEVELOPER</h1>

          <div className="products">
            {items.map(({ node }, index) => (
              <Product key={node.id} node={node} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
