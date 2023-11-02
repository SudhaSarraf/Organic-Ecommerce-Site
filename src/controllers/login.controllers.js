const signupModel = require('../models/signup.model');

async function login(req,res){
    const email = req.query.email;
    const userPassword = req.query.password;
    if(!email) return res.status(400).send({message: "Email is missing!"});
    await signupModel.getUserByEmail(email).then(result=>{
    console.log(result[0].password,'result');
    if(result){
        var password = result[0].password;
        if( password == userPassword)  return res.send({message: "Login Successfull"});
    }
    else return res.status(400).send({error:'Login Failed'});

    }).catch(e=>{
        console.log(e,'error')
        return res.status(400).send({error: "Internal Server Error"})
    });
}

async function getUserInfo(req,res){
    const email = req.query.email;
    await signupModel.getUserInfoByEmail(email).then(result=>{
        console.log(result[0], 'userInfo');
        var output = null;
        if(result.length>0){
            output = result;
        }
        return res.send({output});
    }).catch(e=>{
        return res.status(500).send({error:"Internal Server Error."})
    });
}

module.exports = { login, getUserInfo}