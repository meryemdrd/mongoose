  
const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(
                `mongodb+srv://${process.env.myUsername}:${process.env.myPassword}@cluster0-7impo.mongodb.net${process.env.db}?retryWrites=true&w=majority`, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            .then((result) => console.log("DB Connected Successfully"));
    } catch (error) {
        handleError(err)
    }
}
