import BaseControllerAbstract from '../controllers/base.controller'
import { CategoryController } from '../controllers/category.controller'
import { MongoCategoryRepository } from '../repositories/category.repository'
import { CategoryService } from '../services/category.service'

const makeCategoryController = (): BaseControllerAbstract => {
  const categoryRepository = new MongoCategoryRepository()

  const categoryService = new CategoryService(categoryRepository)

  return new CategoryController(categoryService)
}

export default makeCategoryController
