const { address } = require('ip');
const {dbConn} = require('../../config/config');

class Vlog{

    static async getAllVlogs(){
        var query = 'select * from vlogs;';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [],
                (err,res)=>{
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static async createVlogs(vlogData){
        console.log(vlogData,'vlog data')
        const query = 'INSERT INTO vlogs (author,date,title,introduction,content,files) VALUES (?, ?, ?,? ,?,?)';
        return new Promise((resolve, reject)=>{
            dbConn.query(query,
                [   vlogData.author,
                    vlogData.date,
                    vlogData.title,
                    vlogData.introduction,
                    vlogData.content,
                    vlogData.files.toString()
                ],
                (err, result)=>{
                    console.log(err, result), 'error';
                    if(err) reject(err);
                    else resolve(result);
                });
        });
    }

    static async deleteVlog(id){
        const query = 'DELETE FROM vlogs WHERE id = ?';
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

module.exports = Vlog;