import express from "express";
import fetch from "node-fetch";
import NodeCache from "node-cache";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product.js";

dotenv.config();
const { SHOPIFY_ACCESS_TOKEN } = process.env;

const app = express();
const port = 3000;
const db =
  "mongodb+srv://klyassmaria:BQJS3Hm0uIauKELI@shopify-cpb.fw6rfec.mongodb.net/products?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then((res) => console.log("connected to db"))
  .catch((error) => console.log(error));

const myCache = new NodeCache();

app.get("/getProducts", async (_req, res) => {
  try {
    const cachedData = myCache.get("productsData");
    if (cachedData) {
      res.json(cachedData);
    } else {
      const graphqlEndpoint = `https://cpb-new-developer.myshopify.com/admin/api/2024-01/graphql.json`;
      const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            
            bodyHtml
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
    `;
      const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": `${SHOPIFY_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      });

      const { data } = await response.json();

      if (data && data.products && data.products.edges) {
        data.products.edges.forEach(async (productData) => {
          const shopifyId = productData.node.id;

          const product = new Product({
            shopifyId: shopifyId,
            title: productData.node.title,
            bodyHtml: productData.node.bodyHtml,
            images: [
              {
                src: productData.node.images.edges[0]?.node?.src || "",
              },
            ],
          });

          try {
            await product.save();
          } catch (error) {
            console.error("Error saving product:", error);
          }
        });

        myCache.set("productsData", data, 3600);
        res.json(data);
      } else {
        console.error(
          "Unexpected or missing data structure in GraphQL response"
        );
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } catch (error) {
    console.error("Error handling /getProducts request:", error);
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (_req, res) => {
  res.send(
    "Hello, this is the test path! Data is at http://localhost:3000/getProducts"
  );
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // console.log(process.env);
});
