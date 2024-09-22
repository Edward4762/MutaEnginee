const { createrazorpayInstance } = require("../config/razorpay.config")

const razorpayInstance = createrazorpayInstance

exports.createOrder = async(req,res) => {
    const {courseId, amount} = req.body

    const options = {
        amount: amount*100,
        currency: "INR",
        receipt: 'order_number'
    }

    try{
        razorpayInstance.orders.create(options,(err,order) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: "Something went wrong"
                })
            }
            return res.status(200).json(order)
        })
    }
    catch(error){
        console.log(error)
        res.status(402).send(`Couldnt process the payment`)
    }
}

exports.verifyPayment = async(req,res) => {
    const {order_id,payment_id,signature} = req.body;

    const secret = process.env.secret
    const hmac = crypto.createHmac("sha256", secret)
    hmac.update(order_id + '|' + payment_id)
    const generatedSignature = hmac.digest("hex")

    if(generatedSignature==signature){
        return res.status(200).send("Payment verified")
    }
    else{
        return res.status(400).send("Payment not verified")
    }
}