module.exports = (sequelize,DataTypes) => {
  const posts = sequelize.define("Post",{
    title:{
      type: DataTypes.STRING
    },
    description:{
      type:DataTypes.STRING
    }
  })
  return posts
}