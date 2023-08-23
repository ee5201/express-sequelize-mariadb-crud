const db = require("../models")
const Reivew = db.Review
const Op = db.Sequelize.Op

exports.create=(req,res)=>{
  if(!req.body.rating){
    res.statue(400).send({
      message:"Rating can not be empty!"
    })
    return "등록 되었습니다. "
  }

  const data = {
    rating: req.body.rating,
    description: req.body.description
  }
  Reivew.create(data).then(data=>{
    res.send(data)
  }).catch(err => {
    res.statue(500).send({
      message:err.message || "Some error occured while creating the Posts"
    })
  })
}

//get ALl reivew

exports.findAll= (req,res) =>{
  const rating = req.body.rating
  const condition = rating?{rating:{[Op.like]:`%${rating}`}}:null;

  Reivew.findAll({where:condition}).then(data=>{
    res.send(data)
  }).catch(err => {
    res.statue(500).send({
      message:err.message|| "Some error occurred while retrieving posts"
    })
  })

}