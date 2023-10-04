const res = require("express/lib/response");
const pool = require("../../config/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { callbackPromise } = require("nodemailer/lib/shared");

module.exports = {
    /*** Authenticating user */
    fetchUser:(data,callBack) => {     
        // return callBack("User is not blocked");                    
        pool.query(
            `select id,userRole,first_name, login_fail_attempt, email, password,companyCode from users where email = ?`,
            [
                data.email,               
            ],     
            (error, results, fields) => {
                const queryData = results;
                if(error){
                    return callBack(error);
                }else if(results == ""){
                    err = "EmailId is not registered";
                    return callBack(err);
                }
                else
                {
                    let bool = bcrypt.compareSync(data.password,results[0].password);                   

                    if(bool == false){
                        const login_fail_attempt = parseInt(results[0].login_fail_attempt) + 1;
                        pool.query(
                            `Update users set login_fail_attempt = ? where email = ?`,
                            [
                                login_fail_attempt,
                                data.email
                            ],
                            (err,results,fields) =>{
                                err = "Password is Incorrect";                                
                                return callBack(err);
                            }
                        );                       

                    }else{
                        pool.query(
                            `Update users set login_fail_attempt = ? where email = ?`,
                            [
                                0,
                                data.email
                            ],
                            (err,results,fields) =>{  
                                
                                var newDate = new Date();
                                var time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
                                var date = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();
                                var status = "logged in";
                                pool.query(
                                    `insert into logs(name,time,date,status) values (?,?,?,?)`,
                                    [
                                        data.email,
                                        time,
                                        date,
                                        status
                                    ],
                                    (err,results) =>{
                                        if(err){
                                           return callBack(err);   
                                        }
                                        else{
                                            const user = {
                                                id:queryData[0].id,
                                                username:queryData[0].name,
                                                email:queryData[0].email   
                                            };
                                            const token = jwt.sign({user}, 'secretkey', { expiresIn: 60 * 60 });
                                            const message = {
                                                token:token,
                                                userRole:queryData[0].userRole,
                                                company:queryData[0].companyCode,
                                                empid:queryData[0].id //getting from  userr table
                                            };                                            
                                            return callBack(null,message);   
                                            
                                        }
                                    });                                                        
                            }
                        );
                    } 
                }                               
            }      
        );         
    },  

     /*** creating the new user */
     create:(data, callBack) => {            
        pool.query(
            `select * from users where email = ?`,
            [data.email],
            (error, results) => {
                if(results == ""){
                    pool.query(
                        `INSERT INTO users(name,email,mobileno,password,userRole,companyCode) VALUES (?,?,?,?,?,?)`,
                            [
                                data.name,
                                data.email,
                                data.mobileno,
                                data.password,                                    
                                data.userRole,
                                data.companyCode
                            ],
                            (error) => {                                    
                                if(error){
                                    return callBack(error);
                                }else{


                                    message = {
                                        email:data.email,
                                        password:data.pass
                                    };
                                    return callBack(null, message); 
                                }                                    
                            }
                    );
                }
                else if(error){
                    return callBack(error);
                }
                else{
                    error = "Email Id is already Registered";
                    return callBack(error);
                }                   
            }                
        );               
   },
   updatePasswordS:(data,callBack) => {
        pool.query(
            `select * from users where email = ?`
            [data.email],
            (error, results) => {
                if(results != ""){                  
                    pool.query(`update users set password = ? where email = ?`,
                        [
                            data.password,
                            data.email
                        ],
                        (error,results) => {
                            if(error){
                                return callBack(error);
                            }else{
                                message = "Password updated successfully";
                                return callBack(null, message);
                            }                            
                        }
                    );
                }else if(error){
                    return callBack(error);
                }
                else{
                    error = "Email Id is not Registered";
                    return callBack(error);
                }
            }
        );
   },
   getUsers:(companyCode,callback)=>{
        pool.query(
            'select * from users where companyCode=? and userRole <> "admin"',
            [companyCode],
            (err,results)=>{
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
   getUser:(companyCode,callback)=>{
    pool.query(
        'select * from users where companyCode=? and userRole <> "user"',
        [companyCode],
        (err,results)=>{
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

logoutUsers:(data,callback)=>{
  
        pool.query(
            `select * from users where email = ?`,
            [
                data.email
            ],
            (err,results,fields) =>{  
                var newDate = new Date();
                var time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
                var date = newDate.getFullYear()+'-'+(newDate.getMonth()+1)+'-'+newDate.getDate();
                var status = "logged out";
                pool.query(
                    `insert into logs(name,time,date,status) values (?,?,?,?)`,
                    [
                        data.email,
                        time,
                        date,
                        status
                        
                    ],
                    (err,results)=>{
                        if(err){
                            return callback(err);
                        }
                        else if(results){
                            return callback(null,results);
                        }
                    }
                )
            },
        );
},
logoutdetails:(callback) =>{
    pool.query(`select * from logs`,    
        
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
};