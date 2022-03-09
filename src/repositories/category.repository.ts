import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos'
import Category from '../entities/category.entity'
import Product from '../entities/product.entity'
import MongooseHelper from '../helpers/mongoose.helper'
import CategoryModel from '../models/category.model'

export interface CategoryRepositoryAbstract {
  create: (createCategoryDto: CreateCategoryDto) => Promise<Category>
  getOne: (id: string) => Promise<Category | null>
  getAll: () => Promise<Category[]>
  update: (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ) => Promise<Category>
  delete: (id: string) => Promise<Category>
}

export class MongoCategoryRepository implements CategoryRepositoryAbstract {
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await CategoryModel.create(createCategoryDto)

    return MongooseHelper.map<Category>(category.toJSON())
  }

  async getAll() {
    const categories = await CategoryModel.find({}).populate('products').exec()

    return categories.map((category) => {
      return {
        ...MongooseHelper.map<Category>(category.toJSON()),
        products: category.products.map((product) =>
          MongooseHelper.map<Product>(product.toJSON())
        )
      }
    })
  }

  async getOne(id: string) {
    const category = await CategoryModel.findById(id)

    return MongooseHelper.map<Category>(category.toJSON())
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true }
    )

    return MongooseHelper.map<Category>(category.toJSON())
  }

  async delete(id: string) {
    const category = await CategoryModel.findByIdAndDelete(id, { new: true })

    return MongooseHelper.map<Category>(category.toJSON())
  }
}
