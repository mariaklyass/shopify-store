import axios from "axios";

export const request = async () => {
  try {
    const res = await axios.get("/api/getProducts");
    const responseData = res.data;
    const productsData =
      responseData &&
      responseData.data &&
      responseData.data.products &&
      responseData.data.products.edges;

    if (productsData) {
      // console.log(productsData);
      return productsData;
    } else {
      console.error("Invalid response structure:", responseData);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
