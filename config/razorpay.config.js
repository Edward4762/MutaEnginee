const razorpay = require("razorpay")

exports.createrazorpayInstance = () => {
    return new razorpay({
        key_id: "rzp_test_VzpFWWm6IfTtmi",
        key_secret: "vBdiYppzPexU3wRrk4r5zUvJ"
    })
}