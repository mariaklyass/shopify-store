import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    shopifyId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    bodyHtml: { type: String, required: true },
    images: [
      {
        src: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
