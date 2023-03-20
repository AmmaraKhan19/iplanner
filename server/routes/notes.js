const express = require('express'); //to use express
const router = express.Router(); // to use router from express
var fetchuser = require('../middleware/fetchuser'); // to fetch user id from jwt token and use it
const Note = require('../models/Note'); // to import Notes schema from model
const { body, validationResult } = require('express-validator'); // to validate users

/*-----------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- ROUTES ---------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/




/*------------------------------------------------ ROUTE 1 -----------------------------------------------------*/
/*------------------------------------------- GET ALL NOTES ENDPOINT -------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

// Get all notes of a user using: GET "/api/notes/fetchallnotes". login required

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    // try to retrieve the user notes by id from the jwt token
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
        
    } 
    // if internal errors occur, display them
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

/*------------------------------------------------ ROUTE 2 -----------------------------------------------------*/
/*--------------------------------------------- ADD NOTES ENDPOINT ---------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

// Add new notes using: POST "/api/notes/addnote". login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a title').isLength({ min: 5 }), // minimum length of  title
    body('description', 'Provide a description').isLength({ min: 15 }), // minimum length of  description 
], async (req, res)=>{
    // try to add a note by user in db through id from the jwt token
    try {
        // destructuring the requested body
        const {title, description, tag} = req.body;
        // if errors, return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Add neww note
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        // save the note added
       const saved_note = await note.save();
       res.json(saved_note);
    }
    // if internal errors occur, display them
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
   }
})

/*------------------------------------------------ ROUTE 3 -----------------------------------------------------*/
/*-------------------------------------------- UPDATE NOTE ENDPOINT --------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

// Update note using: PUT "/api/notes/updatenote". login required

router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    // try to update a note to avoid unnessessory errors
    try {
        // destructuring the note data
        const {title, description, tag} = req.body;
        // create new note object
        const newnote = {};
        if(title) {
            newnote.title = title;
        }
        if(description) {
            newnote.description = description;
        }
        if(tag) {
            newnote.tag = tag;
        }
        // find the note to update
        let note = await Note.findById(req.params.id);
        // if note not found
        if(!note){
            return res.status(404).send('Not Found');
        }
        // if user doesn't own note then dont allow updation
        if(note.user.toString() != req.user.id){
            return res.status(401).send('Action not Allowed');
        }
        // If it is the same user then update the note
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newnote}, {new: true});
        res.json({note});
    }  
    // if internal errors occur, display them
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
   }
})

/*------------------------------------------------ ROUTE 4 -----------------------------------------------------*/
/*-------------------------------------------- DELETE NOTE ENDPOINT --------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

// Delete a note using: DELETE "/api/notes/deletenote". login required

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    // try to delete a note to avoid unnessessory errors
    try {
        // find the note to delete
        let note = await Note.findById(req.params.id);
        // if note not found
        if(!note){
            return res.status(404).send('Not Found');
        }
        // if user doesn't own note then dont allow deletion
        if(note.user.toString() != req.user.id){
            return res.status(401).send('Action not Allowed');
        }
        // If it is the same user then update the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note Successfully deleted"});
    }
     // if internal errors occur, display them
     catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
   }
})

module.exports = router;