const express = require('express')
const { register, login } = require('../Controllers/auth')
const router = express.Router()



//http://localhost:5000/api/register
router.post('/register', register)

router.post('/login',login)

module.exports = router