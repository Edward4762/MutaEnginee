const moongose = require("mongoose")

const MONGO_URL = process.env.MONGO_URL

exports.connect = () => {
    moongose.connect(MONGO_URL,{
    })
    .then(
        console.log("DB connected succesfully")
    )
    .catch((error) =>{
        console.log("DB connection failed")
        console.log(error)
        process.exit(11)
    })
}