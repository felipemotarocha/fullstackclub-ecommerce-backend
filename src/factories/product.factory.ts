import BaseControllerAbstract from '../controllers/base.controller'
import { ProductController } from '../controllers/product.controller'
import { MongoProductRepository } from '../repositories/product.repository'
import { ProductService } from '../services/product.service'

const makeProductController = (): BaseControllerAbstract => {
  const productRepository = new MongoProductRepository()

  const productService = new ProductService(productRepository)

  return new ProductController(productService)
}

export default makeProductController
