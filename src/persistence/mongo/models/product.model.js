import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  status: { type: Boolean, default: true },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model("Product", productSchema);