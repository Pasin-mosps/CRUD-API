const express = require(`express`)
const morgan =require(`morgan`)
const cors =require(`cors`)
const bodyParser = require(`body-parser`)
const router = express.Router();

const connectDB = require('./Config/db')

const { readdirSync } = require(`fs`) // route 3

//Route 2
// const productRouters = require('./Routes/product')
// const authRouters = require('./Routes/auth')

const app = express();

connectDB();

app.use(morgan(`dev`))
app.use(cors())
app.use(bodyParser.json({limit: '10mb'}))
// Route 1

// app.get('/product',(req,res)=>{
//     res.send('Hello Endpoint')
// })

// Route 2
// app.use('/api', productRouters)
// app.use('/api', authRouters)

// Route 3 ใช้จริงวิธีนี้
readdirSync(`./Routes`).map((r)=> app.use(`/api`, require(`./Routes/` +r)))

app.listen(5000,()=> console.log('Server in running on port 5000'))