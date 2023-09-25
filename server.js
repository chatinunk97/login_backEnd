const express = require('express')
const app = express()
require('dotenv').config()
//Port and Routers
const port = process.env.PORT;
const userRouter = require('./routers/userRouter')

//Handle Body Parsed from Requrest
app.use(express.json())


app.use('/user',userRouter)

app.use((error,req,res,next)=>{
    res.status(404).json(error)
})

app.listen(port,()=>{console.log('Server is ready on PORT => ', +port)})