const {dbConn} = require('../../config/config');

class OrderDetails{
    static async createOrderDetail(data){
        const query = 'INSERT INTO order_details(order_id,product_name,price,quantity) VALUES (?,?,?,?)';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [
                   Number(data.id),
                   data.product_name,
                   data.price,
                   data.quantity
                ],
                (err, result)=>{
                    console.log(err, result), 'error';
                    if(err) reject(err);
                    else resolve(result);
                });
        });
    }

    static async deleteOrderDetail(id){
        const query = 'DELETE FROM order_details WHERE id=?';
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

module.exports = OrderDetails;