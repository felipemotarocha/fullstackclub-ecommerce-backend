import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos'
import Product from '../entities/product.entity'
import { ProductRepositoryAbstract } from '../repositories/product.repository'

export interface ProductServiceAbstract {
  create: (createProductDto: CreateProductDto) => Promise<Product>
  getOne: (id: string) => Promise<Product | null>
  getAll: () => Promise<Product[]>
  update: (id: string, updateProductDto: UpdateProductDto) => Promise<Product>
  delete: (id: string) => Promise<Product>
}

export class ProductService implements ProductServiceAbstract {
  private readonly productRepository: ProductRepositoryAbstract

  constructor(productRepository: ProductRepositoryAbstract) {
    this.productRepository = productRepository
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.create(createProductDto)
  }

  async getOne(id: string) {
    return await this.productRepository.getOne(id)
  }

  async getAll() {
    return await this.productRepository.getAll()
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto)
  }

  async delete(id: string) {
    return await this.productRepository.delete(id)
  }
}
