import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos'
import Category from '../entities/category.entity'
import { CategoryRepositoryAbstract } from '../repositories/category.repository'

export interface CategoryServiceAbstract {
  create: (createCategoryDto: CreateCategoryDto) => Promise<Category>
  getOne: (id: string) => Promise<Category | null>
  getAll: () => Promise<Category[]>
  update: (
    id: string,
    updateCategoryDto: UpdateCategoryDto
  ) => Promise<Category>
  delete: (id: string) => Promise<Category>
}

export class CategoryService implements CategoryServiceAbstract {
  private readonly categoryRepository: CategoryRepositoryAbstract

  constructor(categoryRepository: CategoryRepositoryAbstract) {
    this.categoryRepository = categoryRepository
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto)
  }

  async getAll() {
    return await this.categoryRepository.getAll()
  }

  async getOne(id) {
    return await this.categoryRepository.getOne(id)
  }

  async update(id, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto)
  }

  async delete(id) {
    return await this.categoryRepository.delete(id)
  }
}
