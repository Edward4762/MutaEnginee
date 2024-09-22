const razorpay = require("razorpay")

exports.createrazorpayInstance = () => {
    return new razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    })
}