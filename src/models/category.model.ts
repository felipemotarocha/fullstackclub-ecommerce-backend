import { Schema, model, Types } from 'mongoose'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  products: {
    type: [Types.ObjectId],
    ref: 'Product',
    required: true
  }
})

const CategoryModel = model('Category', categorySchema)

export default CategoryModel
