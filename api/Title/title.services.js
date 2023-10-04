const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     creates:(data, callBack) => {
         pool.query(
            `select * from title where check_Id = ?`,
            [data.check_Id],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `INSERT INTO title(check_Id,title,did) VALUES (?,?,?)`,
                         [
                            data.check_Id,
                            data.title,
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
            `select * from title where id = ?`,
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
        pool.query(`SELECT title.id, title.check_Id, title.title,title.countsubmit, title.did, department.deptName from title INNER join department on title.did = department.id`,    
            
            (err,results) => {
                if(results==''){
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

    gettitleDatas:(did,callback) =>{
        pool.query(`select * from title where did = ?`,    
            [
                did
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
            `select * from title where check_Id = ? and id <> ?`,
            [
                data.check_Id,
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE title SET check_Id=?,title=?,did=? WHERE  id = ?`,
                         [
                            data.check_Id,
                            data.title,
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
     incrementCountSubmits: (id, callBack) => {
        pool.query(
          `UPDATE title SET countsubmit = countsubmit + 1 WHERE id = ?`,
          [id],
          (err, results) => {
            if (err) {
              return callBack(err);
            } else {
              return callBack(null, results);
            }
          }
        );
      },
     deleteByIds:(id,callBack) => {
        pool.query(
            `delete from title  where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                }
                return callBack(null, results);
            }
        );
     },
};
