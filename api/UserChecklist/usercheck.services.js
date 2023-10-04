const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
    creates:(data, callBack) => {
         pool.query(
            `select * from userchecklist where id = ?`,
            [data.id],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `INSERT INTO userchecklist(obj1, obj2, mul1, mul2, mul3, mul4, lab1, lab2, lab3, lab4, rat1,selectedImage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                         [
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
                            data.selectedImage
                            
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
            `select * from userchecklist where id = ?`,
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
        pool.query(`SELECT * from userchecklist`,    
            
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
        pool.query(`select * from userchecklist where id = ?`,    
            [
                id
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




    // updatebyIds:(data, id, callBack) => {
    //     pool.query(
    //         `select * from title where check_Id = ? and id <> ?`,
    //         [
    //             data.check_Id,
    //             id
    //         ],
    //         (err,results) =>{
    //             if(results == ""){
    //                 pool.query(
    //                     `UPDATE title SET check_Id=?,title=?,did=? WHERE  id = ?`,
    //                      [
    //                         data.check_Id,
    //                         data.title,
    //                         data.did,
    //                         id
    //                      ],
    //                      (err,results) =>{
    //                          if(err){
    //                             return callBack(err);   
    //                          }
    //                          else{
    //                              return callBack(null, results);
    //                          }
    //                      }
    //                  );
    //             }else if(err){
    //                 return callBack(err);
    //             }else{
    //                 err = "Data Found Duplicate";
    //                 return callBack(err);
    //             }
    //         }
    //      );         
    //  },
     deleteByIds:(id,callBack) => {
        pool.query(
            `delete from userchecklist  where id = ?`,
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
