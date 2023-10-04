const { creates,getByIDs,updatebyIds,getDatas,deleteByIds, gettitleDatas, incrementCountSubmits } = require('./title.services');
const fs = require('fs');
const mime = require('mime');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    create:(req,res) => {
        const body = req.body;
        creates(body,(err,results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    status:500,
                    error:err
                });
            }else{
                return res.status(200).json({
                    success:1,
                    data:results,
                    status:200
                });
            }  
        });
    },

    getById:(req, res) => {
        const id = req.params.id;
        getByIDs(id,(err,results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    status:500,
                    error:err
                });
            }
            else if(empty){
                return res.status(401).json( {
                    success:0,
                    status:401,
                    error:err
                });}
            else{
                return res.status(200).json({
                    success:1,
                    message:results,
                    status:200
                });
            }
        });
    },
    updatebyId:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updatebyIds(body, id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    message:results
                });
            }
        });
     },
     getData:(req,res) => {
        getDatas((err,empty,results) => {
                if(err){
                    return res.status(500).json({
                        success:0,
                        status:500,
                        error:err
                    });
                }else if(empty){
                    return res.status(401).json( {
                        success:0,
                        status:401,
                        error:err
                    });
                }else{
                    return res.status(200).json({
                        success:1,
                        data:results,
                        authData:req.authData,
                        status:200
                    });
                }
        });
    },
    incrementCountSubmit: (req, res) => {
        const { id } = req.params;
        incrementCountSubmits(id, (err, results) => {
          if (err) {
            return res.status(500).json({
              success: 0,
              status: 500,
              error: err,
            });
          } else {
            return res.status(200).json({
              success: 1,
              data: results,
              authData: req.authData,
              status: 200,
            });
          }
        });
      },
      

    
    gettitleDatas:(req,res) => {
        const did = req.body.did;
        gettitleDatas(did,(err,empty,results) => {
                if(err){
                    return res.status(500).json({
                        success:0,
                        status:500,
                        error:err
                    });
                }else if(empty){
                    return res.status(401).json( {
                        success:0,
                        status:401,
                        error:err
                    });
                }else{
                    return res.status(200).json({
                        success:1,
                        data:results,
                        authData:req.authData,
                        status:200
                    });
                }
        });
    },
    deleteById:(req,res) => {
        const id = req.params.id;
        deleteByIds(id, (err, results) => {
            if(err){
                console.log(err);
                return err;                
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            else{
                return res.json({
                    success:1,
                    data:"Deleted data successfully"
                });
            }
        });
     } 
};

