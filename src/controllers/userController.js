import userModel from "../models/userModel.js";
import Auth from "../common/auth.js";

const createAccount = async(req,res) => {
  try {
    console.log(req.body);

    let user = await userModel.findOne({ email: req.body.email})

    if(!user){
        req.body.password = await Auth.hashpassword(req.body.password)
        await userModel.create(req.body)
        res.status(201).send({
            message: "User Created Successfully"
        })
        console.log("Server Response", res.data);
     }
     else{
        res.status(400).send({message: `User with ${req.body.email} already exists`})
     }
  } catch (error) {
    res.status(500).send({
        message: "Internal Server Error",
        error: error.message
    })
  }
}

const loginAccount = async(req,res) => {
    try {
        let user = await userModel.findOne({email: req.body.email})

        if(user){
            let hashCompare = await Auth.hashCompare(req.body.password, user.password)
            if(hashCompare){
                let token = await Auth.createToken({
                   id: user._id,
                   name: user.name,
                   email: user.email, 
                })
                let userData = await userModel.findOne({
                    email:req.body.email
                }, {_id:0, password:0, email:0});

                res.status(200).send({ message:"Login Successfully",
                token,
                userData 
                });
            }
            else{
                res.status(400).send({
                    message:"Invalid Password"
                })
            }
        }
        else{
            res.status(400).send({
                message: `Account with ${req.body.email} doesn't exists!`
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


export default {
    createAccount,
    loginAccount
}
