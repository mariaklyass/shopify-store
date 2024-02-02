import React from "react";
import ImageCanvas from "./ImageCanvas";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Product({ node, index }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${index}`, { state: { index } });
  };

  return (
    <div className="product" key={node.id}>
      <div className="image">
        {/*if i had access to external links// <Link to={`/product/${node.id}`}> */}
        <button className="image-btn" onClick={handleProductClick}>
          <ImageCanvas
            images={node.images.edges.map(({ node: imageNode }) => imageNode)}
          />
        </button>
      </div>
      <div className="description">
        <h2 className="title">TITLE: {node.title}</h2>
        <h3>ID: {node.id}</h3>
        Part of the text:
        <div
          className="htmlBody"
          dangerouslySetInnerHTML={{
            __html: node.bodyHtml?.substring(0, 200),
            // __html: node.bodyHtml,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Product;
