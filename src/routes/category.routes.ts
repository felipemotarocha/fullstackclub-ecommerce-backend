import { Router } from 'express'
import adaptRoute from '../adapters/express-route-adapter'
import makeCategoryController from '../factories/category.factory'

const router = Router()

router.get('/', adaptRoute(makeCategoryController(), 'getAll'))

router.get('/:id', adaptRoute(makeCategoryController(), 'getOne'))

router.post('/', adaptRoute(makeCategoryController(), 'create'))

router.patch('/:id', adaptRoute(makeCategoryController(), 'update'))

router.delete('/:id', adaptRoute(makeCategoryController(), 'delete'))

export default router
