const { address } = require('ip');
const {dbConn} = require('../../config/config');

class SignUp{

    static async getAllUser(){
        var query = 'select * from users;';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [],
                (err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static async getUser(id){
        var query = 'select * from users where id = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,[
                Number(id)
            ],(err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }
    static async createUser(userData){
        const query = 'INSERT INTO users (name, password, contact, email, username, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [userData.name,
                userData.password,
                userData.contact,
                userData.email,
                userData.userName,
                userData.address,
                userData.role
            ],
                (err, result)=>{
                    console.log(err, result), 'error';
                    if(err) reject(err);
                    else resolve(result);
                });
        });
    }
    static async updateUser(userData){
        const query = 'UPDATE users SET name = ?, password = ?, contact = ?, email = ?, username = ?, address = ?  WHERE id = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [
                    userData.name,
                    userData.password,
                    userData.contact,
                    userData.email,
                    userData.userName,
                    userData.address,
                    userData.id
                ],
                (err, result)=>{
                    console.log(err,result,'update result')
                    if(err) reject(err);
                    else resolve(result.affectedRows);
                });
        });
    }
    static async deleteUser(id){
        const query = 'DELETE FROM users WHERE id = ?';
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
    static checkEmail(email){
        const query = 'select count(id) AS isAvailable from users where email = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(
                query,
                [email],
                (err, result)=>{
                    if(err) reject(err);
                    else{
                        resolve(result[0]["isAvailable"]);
                    }
                }
            )
        })
    }

    static checkEmailOnUpdate(email, id){
        const query = 'select count(id) AS isAvailable from users where email = ? and id <> ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(
                query,
                [
                    email,
                    Number(id)
                ],
                (err, result)=>{
                    if(err) reject(err);
                    else{
                        resolve(result[0]["isAvailable"]);
                    }
                }
            )
        })
    }

    static getUserByEmail(email){
        const query = 'select password from users where email = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(
                query,
                [email],
                (err,result)=>{
                    console.log(err,result);
                    if(err) reject(err);
                    else resolve(result);
                }
            )
        })
    }

    static getUserInfoByEmail(email){
        const query = 'select name AS displayName, username, address, contact, role, email from users where email = ?';
        return new Promise((resolve, reject)=>{
            dbConn.query(
                query,
                [email],
                (err,result)=>{
                    if(err) reject(err);
                    else resolve(result);
                }
            )
        })
    }

}

module.exports = SignUp;