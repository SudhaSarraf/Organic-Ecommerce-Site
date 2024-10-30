const signupModel = require('../models/signup.model');

async function getTotalUser(req,res){
    await signupModel.getAllUser().then(result=>{
        var output = null;
        if(result.length>0){
            output = result;
        }
        return res.send({output});
    }).catch(e=>{
        return res.status(500).send({error:"Internal Server Error."})
    });
}

async function getUserDetail(req,res){
    const id = req.query.id;
    if(!id) return res.status(400).send({message: "Id is missing"});
    await signupModel.getUser(id).then(result=>{
        var output = null;
        if(result.length>0){
            if(id>0) output = result[0];
            else output = result;
        }
        return res.send({output});
    }).catch(e=>{
        return res.status(500).send({error:"Internal Server Error."})
    });
}

async function createNewUser(req, res){
    const userData = req.body;
    if(!userData, !userData.password, !userData.userName, !userData.name, !userData.contact, !userData.email, !userData.address) return res.status(400).send({error: "Reqired Fields"});
    
    var emailExists = await signupModel.checkEmail(userData.email);
    if(emailExists > 0) return res.status(404).send({error:" Email already exists"});
    
    await signupModel.createUser(userData).then(()=>{
        return res.send({message: "Save Successful"});
    }).catch(e =>{
        return res.status(400).send({error: "Error while saving data"});
    });
}

async function updateUser(req, res){
    const userData = req.body;

    var emailExists = await signupModel.checkEmailOnUpdate(userData.email, userData.id);
    if(emailExists === 1) return res.status(404).send({error:" Email already exists"});

    try{
        await signupModel.updateUser(userData);
        res.send({message: "User updated successfully"});
    }catch(error ){
        res.status(400).send({error: "Error while updating user"});
    }
}

async function deleteUser(req, res){
    const id = req.query.id;

    try{
        await signupModel.deleteUser(id);
        res.send({message: "user deleted Successfully"});
    }catch(error){
        res.status(400).send({error: "Error while deleting users"});
    }
}

async function checkEmail(req, res){
    const email = req.body.email;
    try{
        var emailExists = await signupModel.checkEmail(email);
        res.send({ emailExists});

    } catch(error){
        res.status(500).send({error: "Error while checking email existance"});
    }
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

module.exports = { getTotalUser, getUserDetail, createNewUser, updateUser, deleteUser, checkEmail, getUserInfo }
