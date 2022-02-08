import Product from './product.entity'

interface Category {
  id: string
  name: string
  imageUrl: string
  products: Product[]
}

export default Category
