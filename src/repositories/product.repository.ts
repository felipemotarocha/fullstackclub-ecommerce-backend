import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos'
import Product from '../entities/product.entity'
import MongooseHelper from '../helpers/mongoose.helper'
import ProductModel from '../models/product.model'

export interface ProductRepositoryAbstract {
  create: (createProductDto: CreateProductDto) => Promise<Product>
  getOne: (id: string) => Promise<Product> | null
  getAll: () => Promise<Product[]>
  update: (id: string, updateProductDto: UpdateProductDto) => Promise<Product>
  delete: (id: string) => Promise<Product>
}

export class MongoProductRepository implements ProductRepositoryAbstract {
  async create(createProductDto: CreateProductDto) {
    const product = await ProductModel.create(createProductDto)

    return MongooseHelper.map<Product>(product.toJSON())
  }

  async getOne(id: string) {
    const product = await ProductModel.findById(id)

    return MongooseHelper.map<Product>(product.toJSON())
  }

  async getAll() {
    const products = await ProductModel.find({})

    return products.map((product) =>
      MongooseHelper.map<Product>(product.toJSON())
    )
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await ProductModel.findByIdAndUpdate(id, updateProductDto, {
      new: true
    })

    return MongooseHelper.map<Product>(product.toJSON())
  }

  async delete(id: string) {
    const product = await ProductModel.findByIdAndDelete(id)

    return MongooseHelper.map<Product>(product)
  }
}
