const sequelize = require("./utils/database");

sequelize.sync({force: true}).then(() => console.log('Успешная синхронизация')).catch((err) => console.log(err))
