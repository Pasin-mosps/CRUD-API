const Product = require('../models/Product')
const fs = require('fs')

exports.read = async(req,res)=>{
    try{
        const id = req.params.id

        const producted = await Product.findOne({_id: id}).exec();
        res.send(producted)
    } catch (err){
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req,res)=>{
    try{
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
} 

exports.create = async (req,res)=>{
    try{
        let data = req.body
        if (req.file) {
             data.file = req.file.filename
        }
        const producted = await Product(data).save()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req,res) =>{
    try{
        const id = req.params.id
        let newData = req.body
        // console.log(newData)
        // console.log(req.file)
        
        if(typeof req.file !== 'undefined') {
            newData.file = req.file.filename
            await fs.unlink('./upload/' + newData.fileOld,(err) =>{
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        const updated = await Product.findOneAndUpdate({_id: id},newData, {new: true}).exec()
        res.send(updated)
    } catch (err) {
        console.log(err)
        res.status(500).send('server Error')
    }
}

exports.remove = async (req,res) =>{
    try{
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id: id}).exec()

        if (removed?.file) { 
            await fs.unlink('./upload/' + removed.file,(err) =>{
                if (err) {
                    console.log(err)
                } else {
                    console.log('Remove success')
                }
            })
        }
        res.send(removed)
    } catch (err) {
        console.log(err)
        res.send({ name: 'moss', id: 1234})
    }
}