const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     create :(data, product_id, callBack) => {
        const quantity = data.quantity;
        const trackno = data.trackno;
        const date = new Date();
    
        pool.query('SELECT quantity FROM stock WHERE product_id = ?', [data.product_id], (error, results) => {
            if (error) {
                console.error(error);
                return callBack(error);
            }
            
            if (results.length > 0 && results[0].quantity >= quantity) {
                pool.query(
                    'INSERT INTO purchase_track (product_id, quantity, trackno, date) VALUES (?, ?, ?, ?)',
                    [data.product_id, quantity, trackno, date],
                    (error, results) => {
                        if (error) {
                            console.error(error);
                            return callBack(error);
                        }
    
                        return callBack(null, results);
                    }
                );
            } else {                
                const err = "Insufficient Stock or Product Not Found";
                console.error(err);
                return callBack(err);
            }
        });
    },
    
    // Updated createProduct function
    // const createProduct = (req, res) => {
    //     const body = req.body;
    //     const product_id = req.params.product_id;
    
    //     create(body, product_id, (err, results) => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(500).json({
    //                 success: 0,
    //                 data: err,
    //                 message: err,
    //             });
    //         } else {
    //             console.log(results);
    //             return res.status(200).json({
    //                 success: 1,
    //                 data: results,
    //             });
    //         }
    //     });
    // },
                   
    //     pool.query(
    //         `select * from purchase_track where id = ?`,
    //         [data.id],
    //         (err,results) =>{
    //             var date=new Date();
    //             // var rand = "PROD" + Math.floor(Math.random() * 90000 + 10000);
                
    //             if(results == ""){
    //                 pool.query(
    //                     `INSERT INTO purchase_track(product_id,quantity,trackno,date) VALUES (?,?,?,?)`,
    //                      [
    //                         data.product_id,
    //                         data.quantity,
    //                         data.trackno,
    //                         date
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
     getProductById:(id,callBack) => {
        pool.query(
            `select * from purchase_track where id = ?`,
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

     //getting total price of trackno products
     getTotalPrice:(id,callBack) => {
        pool.query(
            `SELECT purchase_track.quantity as pro_quantity, product.price as pro_price FROM purchase_track INNER JOIN product ON purchase_track.product_id = product.id where trackno = ?`,
            [id],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    var total = 0;
                    
                    if(results.length>0){
                        for(var j=0;j<results.length;j++){
                            total += results[j].pro_quantity*results[j].pro_price;
                        }
                    }

                    return callBack(null, total);
                }
                
            }
        );
     },
     //getting the products data
     getProducts:(callBack) => {
         pool.query(
            `select * from purchase_track`,
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
     updateProduct:(data, id, callBack) => {
        pool.query(
            `select * from purchase_track where id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE purschase_track SET product_id=?,quantity=?,track_no=?,date=? WHERE  id = ?`,
                         [
                            data.product_id,
                            data.quantity,
                            data.track_no,
                            date,
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
     deleteProductById:(id,callBack) => {
        pool.query(`delete from purchase_track where id=?`,
            [ 
                id
            ],        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
    );
     },
     
     
    
     
};
