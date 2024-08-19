import mongoose from "./index.js";

const validateEmail = (e) =>{
    var emailPattern =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
}

const userSchema = new mongoose.Schema({
    name: { type:String, required: [true, "Name is Required"]},
    email: { type:String, required: [true, "Email is Required"], validate: [validateEmail, "Please enter a valid email"]},
    password: { type:String, required: [true, "Password is Required"]}
},{
    collection: 'users',
    versionKey: false
})

const userModel = mongoose.model('users', userSchema)

export default userModel