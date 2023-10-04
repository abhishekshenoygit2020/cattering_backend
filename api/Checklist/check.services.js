const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     creates:(data, callBack) => {
         pool.query(
            `select * from checklist where particular = ?`,
            [data.particular],
            (err,results) =>{
                if(results == ""){                    
                    pool.query(
                        `INSERT INTO checklist(did,particular,type,frequency,tid,obj1, obj2, mul1, mul2, mul3, mul4, lab1, lab2, lab3, lab4, rat1, rat2, rat3, rat4) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                         [
                            data.did,
                            data.particular,
                            data.type,
                            data.frequency,
                            data.tid,
                            data.obj1,
                            data.obj2,
                            data.mul1,
                            data.mul2, 
                            data.mul3,
                            data.mul4,
                            data.lab1,
                            data.lab2,
                            data.lab3,
                            data.lab4,
                            data.rat1,
                            data.rat2,
                            data.rat3,
                            data.rat4                            
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
            `select * from checklist where id = ?`,
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
     getDatas:(data,callback) =>{
        pool.query(`SELECT checklist.id, checklist.did, checklist.particular,checklist.type, checklist.frequency,checklist.tid,title.title from checklist INNER join title on checklist.tid = title.id where checklist.tid = ? and checklist.did = ?`,    
            [
                data.tid,
                data.did
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
    getquenstions:(data,callback) =>{
        pool.query(`SELECT  checklist.* from checklist INNER join title on checklist.tid = title.id where checklist.tid = ? `,    
            [
                data.tid,
            ],
            (err,results) => {
                if(results==""){
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
    getTypes:(data,callback) =>{
        pool.query(`SELECT  checklist.obj1,checklist.obj2,checklist.mul1,checklist.mul2,checklist.mul3,checklist.mul4,checklist.lab1,checklist.lab2,checklist.lab3,checklist.lab4,checklist.rat1,checklist.rat2,checklist.rat3,checklist.rat4 from checklist  where type = ? `,    
            [
                data.type,
            ],
            (err,results) => {
                if(results==""){
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
            `select * from checklist where particular = ? and id <> ?`,
            [
                data.particular,
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE checklist SET did=?,particular=?,type=?,frequency=?,tid=? WHERE  id = ?`,
                         [
                            data.did,
                            data.particular,
                            data.type,
                            data.frequency,
                            data.tid,
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
            `delete from checklist  where id = ?`,
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
