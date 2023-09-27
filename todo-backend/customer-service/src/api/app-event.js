
import {CustomerService }from '../service/customer.js'


export async function AppEvent(app){

app.use('/app-events',async(req,res,next)=>{
const service = new CustomerService()
const {payload} = req.body
const result  = await service.SubscribeEvents(payload)

console.log('=======  Todo service recevied Event =======')
return res.status(200).json(payload)

})

}
