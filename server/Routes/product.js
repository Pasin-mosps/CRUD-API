const express = require(`express`)
const router = express.Router()

const { read, list, create, update, remove} = require('../Controllers/product.js')

const { auth } = require('../Middleware/auth')

const admin = require("../Config/firebase.js")
const appCheck = admin.appCheck()
const{ getAppCheck } = require ("firebase-admin/app-check");

const appCheckVerification = async (req, res, next) => {
    const appCheckToken = req.header("X-Firebase-AppCheck");

    if (!appCheckToken) {
        res.status(401);
        return next("Unauthorized");
    }

    try {
        const appCheckClaims = await getAppCheck().verifyToken(appCheckToken);

        // If verifyToken() succeeds, continue with the next middleware
        // function in the stack.
        return next();
    } catch (err) {
        res.status(401);
        return next("Unauthorized");
    }
} 

router.get('/product', appCheckVerification, list)
router.get('/product/:id',read)
router.post('/product', create)
router.put('/product/:id', update)
router.delete('/product/:id', remove)

module.exports = router
