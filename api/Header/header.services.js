const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     creates:(data, callBack) => {
         pool.query(
            `select * from header where header = ?`,
            [data.header],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `INSERT INTO header(header,headerData,tid,did) VALUES (?,?,?,?)`,
                         [
                            data.header,
                            data.headerData,
                            data.tid,
                            data.did
                            
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         );         
     },
     getByIDs:(id,callBack) => {
        pool.query(
            `select * from header where id = ?`,
            [id],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    return callBack(null, results);
                }
                
            }
        );
     },
     //getting the products data
     getDatas:(callback) =>{
        // pool.query(`SELECT title.id,title.title, header.id, header.header, header.headerData, header.did, department.deptName from header INNER join department on header.did = department.id  INNER JOIN title on header.tid = title.id`,    
       pool.query( `SELECT title.title, header.id, header.header, header.headerData, header.did,header.tid, department.deptName from header INNER join department on header.did = department.id  INNER JOIN title on header.tid = title.id`,
            (err,results) => {
                if(results.length==0){
                    var empty ="Data not found";
                    return callback(null,empty);
                }else if(results){
                    return callback(null,null,results);
                }else{
                    return callback(err);
                }
            }
        );
    },
    getHeaders:(data,callback) =>{
       pool.query( `SELECT title.title, header.header, header.headerData, header.tid from header INNER JOIN title on header.tid = title.id where header.tid=?`,
       [
        data.tid,
       ],
            (err,results) => {
                if(results.length==0){
                    var empty ="Data not found";
                    return callback(null,empty);
                }else if(results){
                    return callback(null,null,results);
                }else{
                    return callback(err);
                }
            }
        );
    },
     updatebyIds:(data, id, callBack) => {
        pool.query(
            `select * from header where header = ? and id <> ?`,
            [
                data.header,
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE header SET header=?,headerData=?,tid=?,did=? WHERE  id = ?`,
                         [
                            data.header,
                            data.headerData,
                            data.tid,
                            data.did,
                            id
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         );         
     },
     deleteByIds:(id,callBack) => {
        pool.query(
            `delete from header  where id = ?`,
            [id],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    return callBack(null, results);
                }
            }
        );
     },
     
     
    
     
};


//title distinct
//SELECT distinct title.title from header INNER join title on header.tid = title.id

//department distinct
//SELECT distinct department.deptName from header INNER JOIN department on header.did=department.id
