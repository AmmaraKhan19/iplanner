const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');

//Create a User using: POST "/api/auth/". Dosn't require authentication
router.post('/', [
    // name must be atleast 5 letters
    body('name', 'Name must be alteast 5 characters').isLength({ min: 5 }),
    // email must be an email
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be alteast 8 characters').isLength({ min: 8 }),
    
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user)).catch(err => {console.log(err)
    res.json({error: 'Please enter a valid value'})});
})

module.exports = router;