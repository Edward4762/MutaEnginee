require('dotenv').config()
require("./database/db").connect()
const User = require('./model/user')
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth")
const passport = require('passport')
const authRoute = require("./routes/auth");
const router = require("./routes/payments.routes")

const app = express()
app.use(express.json())
app.use(cookieParser())

const port = 3000

app.use(require('express-session')({ 
    secret: 'mutaengine',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',router)

secretKey = "mutaengine"

app.post('/register', async (req,res) =>{
    try{
        const {firstname, lastname, email, password} = req.body
        if(!((firstname && lastname) && (email && password))){
            res.status(400).send(req.body)
        }
        
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            res.status(401).send(`This email is already registered`)
        }

        const encryptedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword
        })

        const token = jwt.sign(
            {id: user._id, email},
            secretKey,
            {
                expiresIn: "2h"
            }
        );

        user.token = token
        user.password = null

        res.status(201).send(user)


    }catch(error){
        console.log(error)
    }
    
})

app.post('/login', async (req,res) =>{
    try{
        const {email, password} = req.body
        if(!(email && password)){
            res.status(401).send(`Please fill everything`)
        }

        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {id: user._id},
                secretKey,
                {
                    expiresIn: "2h"
                }
            );
            user.token = token
            user.password = undefined

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            };

            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }
    }catch(error){
        console.log(error)
    }
})

app.get('/',auth,(req,res) =>{
    res.send(`Welcome to Mutaengine`)
})

app.use("/auth", authRoute);

app.listen(port,()=>{
    console.log(`Backend working`)
})