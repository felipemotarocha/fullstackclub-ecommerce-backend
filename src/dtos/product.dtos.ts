export interface CreateProductDto {
  name: string
  imageUrl: string
  category: string
}

export interface UpdateProductDto {
  name?: string
  imageUrl?: string
  category?: string
}
