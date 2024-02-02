import express from "express";
import fetch from "node-fetch";
import NodeCache from "node-cache";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const { SHOPIFY_ACCESS_TOKEN } = process.env;

const app = express();
const port = 3000;

const myCache = new NodeCache();

app.get("/getProducts", async (_req, res) => {
  try {
    const cachedData = myCache.get("productsData");
    if (cachedData) {
      console.log("Data retrieved from cache");
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

      const data = await response.json();
      myCache.set("productsData", data, 3600);
      res.json(data);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
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
  console.log(process.env);
});
