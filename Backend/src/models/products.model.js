const { address } = require('ip');
const { dbConn } = require('../../config/config');

class Products{
    static async getProduct(id){
        var query = 'select * from products where id = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,[
                Number(id)
            ],(err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static async getAllProduct(){
        var query = 'select * from products';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [],
                (err,res)=>{
                    //console.log(err,res,'getAllProduct')
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static checkProduct(product_id){
        const query = 'select count(id) AS isAvailable from products where product_id = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(
                query,
                [product_id],
                (err, result)=>{
                    if(err) reject(err);
                    else{
                        resolve(result[0]["isAvailable"]);
                    }
                }
            )
        })
    }

    static async createProduct(productData){
        console.log(productData,'product data')
        const query = 'INSERT INTO products (name,price,quantity,category,product_id,nutritional_value,health_benefits,files) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [   productData.name,
                    Number(productData.price),
                    Number(productData.quantity),
                    productData.category,
                    productData.product_id,
                    productData.nutritional_value,
                    productData.health_benefits,
                    productData.files.toString()
                ],
                (err, result)=>{
                    console.log(err, result), 'error';
                    if(err) reject(err);
                    else resolve(result);
                });
        });
    }

    static async updateProduct(productData){
        const query = 'UPDATE products SET name = ?, price = ?, quantity = ?, product_id = ?, category = ?, nutritional_value = ?, health_benefits=? WHERE id =?';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [
                    productData.name,
                    productData.price,
                    productData.quantity,
                    productData.product_id,
                    productData.category,
                    productData.nutritional_value,
                    productData.health_benefits,
                    productData.id   
                ],
                (err, result)=>{
                    console.log(err,result,'update result')
                    if(err) reject(err);
                    else resolve(result.affectedRows);
                });
        });
    }

    static async deleteProduct(id){
        const query = 'DELETE FROM products WHERE id =?';
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

    static checkProductIdOnUpdate(product_id, id){
        const query = 'select count(id) AS isAvailable from products WHERE product_id = ? and id <> ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,[
                product_id,
                Number(id)
            ],(err,res)=>{
                console.log(err, res)
                if(err) reject(err);
                else resolve(res);
            })
        });

    }
}
module.exports = Products;