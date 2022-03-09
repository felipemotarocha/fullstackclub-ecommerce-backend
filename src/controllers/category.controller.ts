import {
  MissingFieldError,
  MissingParamError,
  NotAllowedUpdateError
} from '../errors/controllers.errors'
import ControllersHelpers from '../helpers/controllers.helpers'
import { CategoryServiceAbstract } from '../services/category.service'
import BaseControllerAbstract, { HttpRequest } from './base.controller'

export class CategoryController implements BaseControllerAbstract {
  private readonly categoryService: CategoryServiceAbstract

  constructor(categoryService: CategoryServiceAbstract) {
    this.categoryService = categoryService
  }

  async create(httpRequest: HttpRequest) {
    try {
      const body = httpRequest.body

      const requiredFields = ['name', 'imageUrl']

      for (const field of requiredFields) {
        if (!body[field]) {
          return ControllersHelpers.badRequest(new MissingFieldError(field))
        }
      }

      const category = await this.categoryService.create(body)

      return ControllersHelpers.created(category)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async getAll() {
    try {
      const categories = await this.categoryService.getAll()

      return ControllersHelpers.ok(categories)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async getOne(httpRequest: HttpRequest) {
    try {
      const params = httpRequest.params

      if (!params.id) {
        return ControllersHelpers.badRequest(new MissingParamError('id'))
      }

      const category = await this.categoryService.getOne(params.id)

      return ControllersHelpers.ok(category)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async update(httpRequest: HttpRequest) {
    try {
      const body = httpRequest.body
      const params = httpRequest.params

      const allowedUpdates = ['name', 'imageUrl', 'products']

      const someReceivedUpdateIsNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return ControllersHelpers.badRequest(new NotAllowedUpdateError())
      }

      // verificar se um ID foi fornecido por parâmetro
      if (!params.id) {
        return ControllersHelpers.badRequest(new MissingParamError('id'))
      }

      const category = await this.categoryService.update(params.id, body)

      return ControllersHelpers.ok(category)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async delete(httpRequest: HttpRequest) {
    try {
      const params = httpRequest.params

      // verificar se um ID foi fornecido por parâmetro
      if (!params.id) {
        return ControllersHelpers.badRequest(new MissingParamError('id'))
      }

      const category = await this.categoryService.delete(params.id)

      return ControllersHelpers.ok(category)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }
}
