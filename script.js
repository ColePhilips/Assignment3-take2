const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//Database setup
main().catch(console.error);
async function main() {
    await mongoose.connect("mongodb://localhost/Assignment3");
    console.log('Connected to MongoDB');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.listen(3000,() => {
    console.log('Server is running on port 3000');
})

//GET all users
app.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//GET a single user by ID
app.get('/users/:id',async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({error: 'User Not Found'});
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
});

//POST a new User
app.post('/users', async (req, res) => {
    try{
        const users = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({error: 'Bad Request'});
    }
});

//Put to update a user
app.put('/users/:id',async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!user) return res.status(404).json({error: 'User Not Found'});
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({error:'Bad Request'});
    }
});

//DELETE a user
app.delete('/users/:id',async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({error: 'User Not Found'});
        res.status(204).json(user);
    }catch(error){
        res.status(500).json({error:'Internal Server Error'});
    }
});