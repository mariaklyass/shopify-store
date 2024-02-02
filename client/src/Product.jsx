import React from "react";
import ImageCanvas from "./ImageCanvas";

function Product({ node }) {
  return (
    <div className="product" key={node.id}>
      <div className="image">
        {/* {node.images.edges.map(({ node: imageNode }, index) => (
          <img key={index} src={imageNode.src} alt={`Image ${index + 1}`} />
        ))} */}
        <ImageCanvas
          images={node.images.edges.map(({ node: imageNode }) => imageNode)}
        />
      </div>
      <div className="description">
        <h2 className="title">TITLE: {node.title}</h2>
        <h3>ID: {node.id}</h3>
        Description:
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
