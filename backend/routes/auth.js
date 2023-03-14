const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');

//Create a User using: POST "/api/auth/createuser". Dosn't require authentication
router.post('/createuser', [
    // minimum length of  name
    body('name', 'Name must be alteast 5 characters').isLength({ min: 5 }),
    // email format must be email@mail.com format
    body('email', 'Enter a valid email').isEmail(),
    // minimum length of password
    body('password', 'Password must be alteast 8 characters').isLength({ min: 8 }),
    
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
        // else if user email doesn't exist then create user
        else{     
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
        }
        res.json(user)
    }
    // if internal errors occur, display them 
    catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
})

module.exports = router;