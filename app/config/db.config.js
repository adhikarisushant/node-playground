module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "admin@123",
    DB: "nodetest",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};