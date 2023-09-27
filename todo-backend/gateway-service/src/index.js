import express from "express"
import cors from "cors"
import proxy from "express-http-proxy"
const app = express()


app.use(cors())
app.use(express.json())
app.use('/customer',proxy('http://localhost:8001'))
app.use('/todo',proxy('http://localhost:8002'))


app.listen(8000,()=>{
    console.log("gateway server runnign on port 8000")
})

