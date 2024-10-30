const orderMain = require('../models/order_main.model');
const orderDetails = require('../models/order_detail.model');

async function createOrderMain(req, res){
    const orderData = req.body;
   // console.log(orderData,'orderData')
    if(!orderData, !orderData.full_name, !orderData.email, !orderData.mobile, !orderData.address, !orderData.price_to_pay, !orderData.total_products) return res.status(400).send({error: "Required Fields"}); 
    await orderMain.createOrder(orderData).then(async(result)=>{
        console.log(result[0][1])
        var order_id = result[1][0].id;
        console.log(order_id);
        var items = orderData.shoppingCart;
        console.log(items);
        if(order_id > 0){
            if(items.length > 0){
                for(var i=0; i< items.length; i++){
                    console.log(items[i].name)
                    console.log(items[i].price);
                    console.log(items[i].qty);

                    let data = {
                        'product_name': items[i].name,
                        'price' : items[i].price,
                        'quantity' : items[i].qty,
                    }

                    data.id = order_id;
                    
                    console.log(data,'data');

                    await orderDetails.createOrderDetail(data).then(()=>{
                        // return res.send({message: "Your Order is placed Successfully"})
                    }).catch(e=>{
                        return res.status(400).send({error:"Error while saving data"})
                    });
                    
                }
            }
        }
        return res.send({message: "Your Order is placed Successfully"});
    }).catch(e =>{
        return res.status(400).send({error:"Error while saving data"});
    })
}

async function getOrder(req,res){
    const id = req.query.id;
    if(!id) return res.status(400).send({message: "Id is missing"});
    await orderMain.getOrderMain(id).then(result=>{
        var output = null;
        if(result.length>0){
            if(id>0) output = result[0];
            else output = result;
        }
        return res.send({output});
    }).catch(e=>{
        return res.status(500).send({error: "Internal Server Error"});
    });
}

async function getAllOrder(req,res){
    await orderMain.getAllOrderMain().then(result=>{
        var output = null;
        if(result.length>0){
            output = result;
        }
        return res.send({output});
    }).catch(e=>{
        return res.status(500).send({error: "Internal Server Error"});
    });
}

async function deleteOrder(req,res){
    const id = req.query.id;

    try{
        await orderMain.deleteOrderMain(id);
        res.send({message: "Order Deleted Successfully"});
    }catch(error){
        res.send(400).send({error: "Error while deleting order"})
    }
}

async function deleteOrderDetails(req, res){
    const id = req.query.id;

    try{
        await orderDetails.deleteOrderDetail(id);
        res.send({message: "products from Cart deleted Successfully"});
    }catch(error){
        res.status(400).send({error: "Error while Deleting"});
    }
}

module.exports = {createOrderMain, getOrder,getAllOrder, deleteOrder, deleteOrderDetails}

