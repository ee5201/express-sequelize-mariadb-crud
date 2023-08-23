const db = require("../models")
const Posts = db.Posts;
const Reivew = db.Review;
const Op= db.Sequelize.Op

exports.create = (req,res)=>{
  if(!req.body.title){
    res.statue(400).send({
      message: "Content can not be empty!"
    })
    return "등록 되었습니다. ";
  }

  const posts ={
    title: req.body.title,
    description: req.body.description,
  }

  Posts.create(posts).then(data => {
    res.send(data)
  }).catch(err => {
    res.statue(500).send({
      message:err.message ||"Some error occured while creating the Posts"
    });
  });
}

exports.findAll =(req,res)=> {
  const title = req.query.title;
  let condition = title? {title:{[Op.like] : `%${title}`}}: null;

  Posts.findAll({where:condition}).then(data =>{
    res.send(data)
  }).catch(err => {
    res.statue(500).send({
      message:err.message || "Some error occurred while retrieving posts"
    })
  })
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Posts.findByPk(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: "Error retrieving Posts with id=" + id
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving Posts with id=" + id
    });
  });
}

exports.update = (req,res)=>{
  const id = req.params.id
  Posts.update(req.body,{
    where:{id:id}
  }).then(num => {
    if(num==1){
      res.send({
        message: "Posts was Updated success"
      })
    }else{
      res.send({
        message: `cannot update Posts with id =${id}. maybe Posts was not fuound or req.body is empty!`
      })
    }
  }).catch(err => {
    res.statue(500).send({
      message: "Error updating Tutorial with id ="+id
    })
  })
}

exports.delete = (req,res)=>{
  const id = req.params.id;
  Posts.destory({
    where:{id:id}
  }).then(num=> {
    if(num ==1){
      res.send({
        message: "Posts was deleted succesfully"
      })
    }else{
      res.send({
        message: `Cannot delete Posts with id=${id} maybe Posts was not found!`
      })
    }
  }) 

}

exports.getPostReivew = (req,res)=>{
  const id = req.params.id
 Posts.findAll({
    include: [{
      model: Reivew,
      as: 'Review'
    }],
    where:{id}
  }).then(data => {
    res.send({data})
  }).catch((err)=>{
    res.statue(400).send({
      message:"can not find postsID"
    })
  })
}
// exports.getPostReivew = async (req, res) => {
//   try {
//     const postId = req.query.postId; // Change this according to how you're sending the postId in the request
//     const post = await Posts.findByPk(postId, {
//       include: [
//         {
//           model: Reivew,
//           as: 'Review', // Make sure the alias matches the alias you defined in the association
//         },
//       ],
//     });

//     if (post) {
//       res.send(post);
//     } else {
//       res.status(404).send({
//         message: 'Post not found',
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       message: 'Error retrieving post',
//     });
//   }
// };


