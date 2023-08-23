
module.exports =app => {
  const post = require("../controller/post.controller.js")
  const reivew = require("../controller/review.controller.js")


  let router =require("express").Router()

  router.post("/",post.create);

  router.get("/",post.findAll);

  router.get("/:id",post.findOne);

  router.put("/:id", post.update);

  router.delete("/:id",post.delete)

  //review 
  router.post('/addReview',reivew.create)
  
  router.get('/allReview',reivew.findAll)

  //1:M 찾기 router
  // router.get('/getPostReivews', post.getPostReivew);
  router.get('/getPostReivews/:id', post.getPostReivew);




  app.use('/api/post', router);
}