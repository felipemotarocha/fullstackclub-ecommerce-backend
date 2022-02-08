import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  collection: {
    type: String,
    required: true
  }
})

const ProductModel = model('Product', productSchema)

export default ProductModel
