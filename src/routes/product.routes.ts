import { Router } from 'express'
import adaptRoute from '../adapters/express-route-adapter'
import makeProductController from '../factories/product.factory'

const router = Router()

router.get('/', adaptRoute(makeProductController(), 'getAll'))

router.get('/:id', adaptRoute(makeProductController(), 'getOne'))

router.post('/', adaptRoute(makeProductController(), 'create'))

router.patch('/:id', adaptRoute(makeProductController(), 'update'))

router.delete('/:id', adaptRoute(makeProductController(), 'delete'))

export default router
