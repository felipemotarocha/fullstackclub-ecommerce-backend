import { Schema, model, Types } from 'mongoose'

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
  category: {
    type: Types.ObjectId,
    required: true,
    ref: 'Category'
  }
})

const ProductModel = model('Product', productSchema)

export default ProductModel
