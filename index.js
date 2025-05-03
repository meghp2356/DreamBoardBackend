import 'dotenv/config'
import {connectDB} from "./db/connection.js"
import {app} from "./app.js"

app.get("/",(req,res)=>{
   return res.json({
        msg: "hello world"
    });
})

connectDB().then(()=>{
    app.listen(8000,()=>{
        console.log("server is running")
    })
}).catch((err)=>{
    console.log(err)
    process.exit(1)
})