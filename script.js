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