const productModel = require('../models/products.model');

    async function getTotalProduct(req,res){
        await productModel.getAllProduct().then(result=>{
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

    async function getProductDetail(req,res){
        const id = req.query.id;
        if(!id) return res.status(400).send({message: "Id is missing"});
        await productModel.getProduct(id).then(result=>{
            // console.log(result);
            var output = null;
            if(result.length>0){
                if(id>0) {output = result[0];
                }
                else output = result;
            }
            return res.send({output});
        }).catch(e=>{
            return res.status(500).send({error:"Internal Server Error."})
        });
    }

    async function createNewProduct(req, res){
        const productData = req.body;
        if(!productData, !productData.name, !productData.price, !productData.quantity, !productData.category, !productData.nutritional_value,!productData.health_benefits, !productData.product_id, !productData.files) return res.status(400).send({error: "Reqired Fields"});
        
        var productExists = await productModel.checkProduct(productData.product_id);
        if(productExists > 0) return res.status(404).send({error:" Product already exists"});
        
        await productModel.createProduct(productData).then(()=>{
            return res.send({message: "Save Successful"});
        }).catch(e =>{
            return res.status(400).send({error: "Error while saving data"});
        });
    }

    async function checkProduct(req, res){
        const product_id = req.body.product_id;
        try{
            var productExists = await productModel.checkProduct(product_id);
            res.send({ productExists});
    
        } catch(error){
            res.status(500).send({error: "Error while checking product_id existance"});
        }
    }

    async function updateProduct(req, res){
        const productData = req.body;

        var productExists = await productModel.checkProductIdOnUpdate(productData.product_id, productData.id);
        if(productExists === 1) return res.status(400).send({error: "Product id already exists"});

        try{
            await productModel.updateProduct(productData);
            res.send({message: "Product Updated Successfully"});
        }catch(error){
            res.status(400).send({error: "Error While Updating Products"});
        }
    }

    async function deleteProduct(req, res){
        const id = req.query.id;

        try{
            await productModel.deleteProduct(id);
            res.send({message: "Product Deleted Successfully"});
        }catch(error){
            res.status(400).send({error: "Error While Deleting Product"});
        }
    }

module.exports = {getTotalProduct ,getProductDetail, createNewProduct, checkProduct, deleteProduct, updateProduct }    