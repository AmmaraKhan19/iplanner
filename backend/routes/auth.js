//  import packages
const express = require('express'); //to use express
const router = express.Router(); // to use router from express
const User = require('../models/User'); // to import User schema from model
const { body, validationResult } = require('express-validator'); // to validate users
const bcrypt = require('bcryptjs'); // to use hash and salt to encrypt user password
var jwt = require('jsonwebtoken'); // to create json tokens for secure client-server connection
const dotenv = require('dotenv'); // to use env variables saved in hidden files like .env.local
dotenv.config();
var fetchuser = require('../middleware/fetchuser');

// get the Secret key from .env.local
const JWT_secret = `${process.env.SECRET_KEY}`;

/*-----------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- ROUTES ---------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/




/*------------------------------------------------ ROUTE 1 -----------------------------------------------------*/
/*-------------------------------------------- CREATE USER ENDPOINT --------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

// Create a User using: POST "/api/auth/createuser". no authentication required
router.post('/createuser', [
    body('name', 'Name must be alteast 5 characters').isLength({ min: 5 }), // minimum length of  name
    body('email', 'Enter a valid email').isEmail(), // email format must be email@mail.com format
    body('password', 'Password must be alteast 8 characters').isLength({ min: 8 }), // minimum length of password 
], async (req, res)=>{
    // if errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try and catch to avoid unneccessory problems/errors
    try {
        // check if user email exists already
        let user = await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({error: 'User with this email already exists'})
        }
        // adding hash and salt to protect user password
        const salt = await bcrypt.genSalt(10); // create salt
        const secPass = await bcrypt.hash(req.body.password, salt); // hash password and merge with salt
        // else if user email doesn't exist then create user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // get user_id from db
        const data = {
            user:{
                id :user.id
            }
        }
        // assign token to user_id to identify the user for safty
        const authtoken = jwt.sign(data, JWT_secret);
        res.json({authtoken});
    }
    // if internal errors occur, display them 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
})

/*------------------------------------------------------------- ROUTE 2 --------------------------------------------------------*/
/*------------------------------------------------------- LOGIN ENDPOINT ------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------*/


// Authenticate a User using: POST "/api/auth/login". no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(), // email format must be email@mail.com format
    body('password', 'Password must be alteast 8 characters').exists().isLength({ min: 8 }), // minimum length of password 
], async (req, res)=>{
     // if errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructuring
    const {email, password} = req.body;
    // try to retrieve the user from provided email provided
    try {
        let user = await User.findOne({email});
        //  show error if email is wrong
        if(!user){
            return res.status(400).json({ errors: "Enter correct credentials" });
        }
        //  compare the password with saved one
        const password_compare = await bcrypt.compare(password, user.password);
        //  if compared passwords are not same
        if(!password_compare){
            return res.status(400).json({ errors: "Enter correct credentials" });
        }
        // if compared passwords match then
        // get user_id from db
        const data = {
            user:{
                id :user.id
            }
        }
        // assign token to user_id to identify the user for safty
        const authtoken = jwt.sign(data, JWT_secret);
        res.json({authtoken});
    } 
     // if internal errors occur, display them
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

/*------------------------------------------------------------- ROUTE 3 --------------------------------------------------------*/
/*------------------------------------------------------- LOGIN ENDPOINT ------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------*/


// Get User deatails using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res)=>{
    // try to retrieve the user data by retrieving id from the provided token
    try {
        userid = req.user.id; // id retrieved from jwt token
        const user = await User.findById(userid).select("-password"); // user data retrieved through id
        res.send(user); //show the retrieved data
    }  
    // if internal errors occur, display them
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router;