const dbConfig = require("../config/config.js")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host:"my-mariadb",
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool:{
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  }
})

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Posts = require("./post.model.js")(sequelize,Sequelize)
db.Review = require("./review.model.js")(sequelize,Sequelize)

// 1:M 설정
db.Posts.hasMany(db.Review, {
  foreignkey: 'Post_id',
  as: 'Review'
})

db.Review.belongsTo(db.Posts,{
  foreignkey: 'Post_id',
  as: 'Post'
})


module.exports = db