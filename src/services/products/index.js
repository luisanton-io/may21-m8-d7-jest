import express from "express"
import ProductModel from "./model.js"

const productsRouter = express.Router()

productsRouter.post('/', async (req, res) => {
    // create a new product.
    try {
        const newProduct = new ProductModel(req.body)
        await newProduct.save()
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(400).send(error)
    }
})

export default productsRouter