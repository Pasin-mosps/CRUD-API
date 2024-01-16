const express = require(`express`)
const router = express.Router()

const { read, list, create, update, remove} = require('../Controllers/product.js')

const { auth } = require('../Middleware/auth')

router.get('/product', list)
router.get('/product/:id',read)
router.post('/product', create)
router.put('/product/:id', update)
router.delete('/product/:id', remove)

module.exports = router
