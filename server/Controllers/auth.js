
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async(req, res) =>{
    try{
        //1.Check user
        const {name, password} =req.body
        
        let checkUser = await user.findOne({ name })
        
        if(checkUser){
            return res.send('User Already Exists !!!').status(400)
        }
        //2.Encrypt
        const salt = await bcrypt.genSalt(30)
        checkUser = new user({
            name,
            password
        })
        checkUser.password = await bcrypt.hash(password,salt)
        console.log(checkUser)
        //3.Save
        await checkUser.save()
        res.send('Register Success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.login = async(req, res) =>{
    try{
        //1.check user
        const { name, password } = req.body
        let checkUser = await user.findOneAndUpdate({ name }, { new: true})
        console.log(checkUser)
        if (checkUser) {
            const MapPassword = await bcrypt.compare(password, checkUser.password)

            if (!MapPassword){
                return res.status(400).send('Password not correct!!!')
            }
            
        //2.Payload
            let payload ={
                user:{
                    name:checkUser.name
                }
            }
        //3.generate
            jwt.sign(payload,'jwtsecret',{ expiresIn : 15},(err,token)=>{
                if(err) throw err;
                res.json({token, payload})
            })
        }else{
            return res.status(400).send('User not found')
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}