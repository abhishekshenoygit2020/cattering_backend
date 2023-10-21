const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {

      creates:(data,callBack) => {
        pool.query(
        `SELECT id FROM trackorder WHERE id = ?`,
        [data.id],
            (error,results) => {
                const trackno = "BBORD3TRC202" + Math.floor(Math.random() * 90000 + 10000);
                const status = "initiated";
                const remark = "order has been initiated";
                const date = new Date();
       
                if(results == ""){
                    pool.query(
                        `INSERT INTO trackorder(userid, trackno, status, remark, date) VALUES (?,?,?,?,?)`,
                        [data.userid, trackno, status, remark, date],
                        (error) => {
                            if(error){
                                return callBack(error);
                            }else{
                                
                                const orderDate = new Date();
                                pool.query(
                                    `INSERT INTO orders(userid, trackid, orderStatus, order_remark, orderDate) VALUES (?,?,?,?,?)`,
                                    [data.userid, data.trackid, status, remark, orderDate],
                                    (error)=> {
                                        if(error){
                                            return callBack(error);
                                        }else{
                                            
                                            return callBack(null,results);
                                        }
                                    }                                    
                                );
                            }
                        }
                    );
                }else if(error){
                    return callBack(error);
                }else{
                    return callBack("Duplicate Entry found");
                }
            }
        );        
    },
      
     getByIDs:(id,callBack) => {
        pool.query(
            `select * from section where id = ?`,
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
     getDatas:(callBack) => {
         pool.query(
            `select * from section`,
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){
                    err = "Data Not Found";
                    return callBack(err);
                }else{
                    return callBack(null, results);
                }

            }
         );
     },
     updatebyIds:(data, id, callBack) => {
        pool.query(
            `select * from section where secName = ? and id <> ?`,
            [
                data.secName,
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE section SET secName=?,secDesc=?,did WHERE  id = ?`,
                         [
                            data.secName,
                            data.secDesc,
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
            `delete from section  where id = ?`,
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
