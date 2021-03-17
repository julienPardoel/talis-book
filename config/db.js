const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.qxgxy.mongodb.net/talis-book",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    )

    .then(() => console.log('connected to mongoDB'))
    .catch((err) => console.log('Failed to connect to mongoDB', err));