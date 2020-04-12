const app = require("./app");
const {MONGO_CONNECTION_STRING, PORT} = require("./common/config");
const mongoose = require("mongoose");

async function startServer() {
    await mongoose.connect(MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

    app.listen(PORT, function () {
        console.log('Сервер ожидает подключения...')
    })
}

startServer();
