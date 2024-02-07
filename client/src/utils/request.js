import axios from "axios";

export const request = async () => {
  try {
    const res = await axios.get("/api/getProducts");
    const responseData = res.data;

    if (responseData && responseData.products && responseData.products.edges) {
      const productsData = responseData.products.edges;

      if (productsData) {
        return productsData;
      } else {
        console.error("Invalid response structure:", responseData);
        return null;
      }
    } else {
      console.error(
        "Unexpected or missing data structure in response:",
        responseData
      );
      return null;
    }
  } catch (err) {
    console.error("Error in request function:", err);
    return null;
  }
};
