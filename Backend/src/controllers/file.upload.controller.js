const fileUpload = require('../models/file.handler');


var uploadFiles = async (req, res) =>{
    fileUpload(req, res, (err)=>{
        if(err){
            if(err.name == 'MultiError') res.status(400).send({error:'multer error'})
            else return res.status(400).send({error:'error @ line 8'})
        }
        else{
            let items = req.files;
            var x = [];
            if(items && items.files.length > 0){
                for(var i =0; i<items.files.length; i++){
                    x.push(items.files[i].filename)
                }
            }
            let body = {
                file: items && items.file && items.file.length > 0 ? items.file[0].filename : null,
                files: x,
            };
            // console.log(body)
            return res.json({
                "body": body,
                "message": null,
                "status": 200
            })
        }
    })
}

module.exports={uploadFiles}