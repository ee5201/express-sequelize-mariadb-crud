module.exports = (sequelize,DataTypes) =>{
  const Review = sequelize.define("Review",{
    rating: {
      type: DataTypes.INTEGER
    },
    description: {
      type:DataTypes.TEXT
    }

  })
  return Review

}