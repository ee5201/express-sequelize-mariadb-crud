const express = require("express")
const cors = require('cors')

require('dotenv').config()

const app = express()

let CorsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(CorsOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const db = require('./models')

db.sequelize.sync().then(()=>{
  console.log("synced db.")
}).catch((err)=>{
  console.log("Failed to sync db:" + err.message)
})

app.get('/',(req,res)=>{
  res.json({message:"welcome"})
})

const PORT = process.env.PORT || 3000

require("./routes/post.routes.js")(app)

app.listen(PORT,()=>{
  console.log(`Server is running on port@@@@@@@@@@@@@@@@@@@@@@@@@@ ${PORT}`)
})