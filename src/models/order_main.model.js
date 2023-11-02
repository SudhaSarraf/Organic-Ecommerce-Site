const { dbConn} = require('../../config/config');

class Order{
    static async createOrder(orderData){
        const query = 'INSERT INTO order_main(full_name,email,mobile,address,price_to_pay,total_products) VALUES(?,?,?,?,?,?); SELECT id FROM order_main ORDER BY id DESC LIMIT 1';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [
                    orderData.full_name,
                    orderData.email,
                    orderData.mobile,
                    orderData.address,
                    orderData.price_to_pay,
                    orderData.total_products
                ],
                (err, result)=>{
                    console.log(err, result), 'error';
                    if(err) reject(err);
                    else resolve(result);
                }
                );
        });
    }

    static async getOrderMain(id){
        var query = 'select * from order_main where id = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,[
                Number(id)
            ],
            (err, res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static async deleteOrderMain(id){
        const query = 'DELETE FROM order_main WHERE id = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(
                query,
                [Number(id)],
                (err, result)=>{
                    console.log(err, result);
                    if(err) reject(err);
                    else resolve(result.affectedRows);
                }
            );
        });
    }
}

module.exports = Order;