const vlogModel = require('../models/vlog.model');

    async function getTotalVlogs(req,res){
        await vlogModel.getAllVlogs().then(result=>{
            // console.log(result);
            var output = null;
            if(result.length>0){
                output = result;
            }
            return res.send({output});
        }).catch(e=>{
            return res.status(500).send({error:"Internal Server Error."})
        });
    }


    async function createNewVlog(req, res){
        const vlogData = req.body;
        if(!vlogData,!vlogData.author,!vlogData.date, !vlogData.title,!vlogData.introduction, !vlogData.content, !vlogData.files) return res.status(400).send({error: "Reqired Fields"});

        
        await vlogModel.createVlogs(vlogData).then(()=>{
            return res.send({message: "Save Successful"});
        }).catch(e =>{
            return res.status(400).send({error: "Error while saving data"});
        });
    }



    
    async function deleteVlog(req, res){
        const id = req.query.id;

        try{
            await vlogModel.deleteVlog(id);
            res.send({message: "Vlog  Deleted Successfully"});
        }catch(error){
            res.status(400).send({error: "Error While Deleting Vlog"});
        }
    }

module.exports = {getTotalVlogs ,createNewVlog, deleteVlog }    