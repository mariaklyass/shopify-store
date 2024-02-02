import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./reducers/productsReducer";
import { useEffect } from "react";
import ImageCanvas from "./ImageCanvas";
ImageCanvas;

function ProductDetails() {
  const dispatch = useDispatch();
  const { items = [] } = useSelector(({ products }) => products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const { state } = useLocation();
  const index = state?.index;
  const product = items[index]?.node;
  if (!product) {
    return <div>Loading...</div>;
  }
  // const imageUrl = product.images.edges[0]?.node?.src;
  const images = product.images.edges.map(({ node }) => node);
  const title = product.title;
  const html = product.bodyHtml;

  return (
    <div className="product">
      <div className="image">
        <ImageCanvas images={images} />
      </div>
      <div className="description">
        <h2 className="title">{title}</h2>
        <h3>Full Text:</h3>

        <div
          className="htmlBodyScroll"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        ></div>
      </div>
    </div>
  );
}

export default ProductDetails;
