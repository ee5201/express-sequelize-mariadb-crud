module.exports = {
  HOST: 'my-mariadb', // 변경
  USER: "root",
  PASSWORD: "root",
  DB: "crudproject",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
};
