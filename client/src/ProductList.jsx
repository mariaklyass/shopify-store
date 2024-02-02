import React from "react";

const ProductList = ({ product }) => {
  return (
    // <div>
    //   <h1>Product List</h1>
    //   {products.map((product) => (
    //     <div key={product.node.id}>
    //       <h2>{product.node.title}</h2>
    //       <p>{product.node.bodyHtml}</p>
    //       <img
    //         src={product.node.images.edges[0].node.src}
    //         alt={product.node.title}
    //       />
    //     </div>
    //   ))}
    // </div>
    <div key={product.node.id}>
      <h2>{product.node.title}</h2>
      <p>{product.node.bodyHtml}</p>
      <img src={product.node.images.edges[0].node.src} alt="Product Image" />
    </div>
  );
};

export default ProductList;
