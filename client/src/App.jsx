import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/getProducts")
      .then((res) => {
        // setData(res.data.data.products.edges);
        console.log(res.data.data.products.edges[0].node.bodyHtml);
        // console.log(res.data.data.products.edges[0].node.id);
        // console.log(res.data.data.products.edges[0].node.images.edges[0].node.src);
        const responseData = res.data;
        const productsData =
          responseData &&
          responseData.data &&
          responseData.data.products &&
          responseData.data.products.edges;

        if (productsData) {
          setData(productsData);
          console.log(productsData);
        } else {
          console.error("Invalid response structure:", responseData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="wrapper">
      <h1>Cpb-new-developer Store</h1>
      <div className="products">
        {data.map(({ node }) => (
          <div className="product" key={node.id}>
            <div className="image">
              {node.images.edges.map(({ node: imageNode }, index) => (
                <img
                  key={index}
                  src={imageNode.src}
                  alt={`Image ${index + 1}`}
                />
              ))}
            </div>
            <div className="description">
              <h2 className="title">TITLE: {node.title}</h2>
              <h3>ID: {node.id}</h3>
              Description:
              <div
                className="htmlBody"
                dangerouslySetInnerHTML={{
                  __html: node.bodyHtml?.substring(0, 100),
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
