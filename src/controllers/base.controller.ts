export interface HttpRequest {
  body?: any
  params?: any
  query?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

interface BaseControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
  delete(httpRequest: HttpRequest): Promise<HttpResponse>
}

export type ControllerMethods =
  | 'create'
  | 'getOne'
  | 'getAll'
  | 'update'
  | 'delete'

export default BaseControllerAbstract
