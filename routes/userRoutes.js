const router = require('express').Router();
let User = require('../models/User');

// GET All users
router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err))
})


// GET user by ID
router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
})


// POST new user
router.route('/add').post((req,res)=>{
    const user = new User(req.body);
    console.log(user)
    user.save()
    .then((res.json("New User details added!")))
    .catch((err)=>{
        res.status(400).json("Error"+ err);
    })
})


// PUT (update) user by ID
router.route('/update/:id').put((req,res)=>{

    // Validate the request to protect from nosql injection

    User.findById(req.params.id)
    .then( user =>{
        var update_query = {};
        for (let key in req.body) {
            if (user[key] && user[key] !== req.body[key]) // if the field we have in req.body exists, we're gonna update it
            update_query[key] = req.body[key];
        }
        // now send it back
        User.updateOne({_id: req.params.id}, update_query)
            .then(res.json("User updated!"))
            .catch(err => res.status(400).json("Error: "+ err))
    })
    .catch( err => res.status(400).json("Error: "+ err))
})


// DELETE user by ID
router.route('/delete/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(user=>{
            if(!user){
                res.status(404).json("User not found!")
            }
            else{
                res.json("User deleted: " + user.id)
            }
        } )
        .catch(err => res.status(400).json("Error: "+ err))
})

module.exports = router;