const mongoose = require('mongoose')
const app_config = require('./config')

const connectDB = async () => {
    try
    {
        const conn = await mongoose.connect(app_config["mongo_uri"], {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err)
    {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;