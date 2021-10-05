import mongoose from "mongoose"
import ProductSchema from "./schema.js";

const ProductModel = mongoose.model("products", ProductSchema)

export default ProductModel