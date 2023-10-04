const { creates,getByIDs,updatebyIds,getDatas,deleteByIds, gettitleDatas } = require('./usercheck.services');
const fs = require('fs');
const mime = require('mime');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");
const { genSaltSync, hashSync} = require("bcrypt");
const { get } = require("express/lib/response");

module.exports = {
    create:(req,res) => {
        const body = req.body;
        let docType = "";        
        
        //resumeDoc
        // body.resumeDoc = body.resumeDoc === "" ? "" :  uploadDocument(req.body.resumeDoc,"resumeDoc");
        
        
        if(body.selectedImage === ""){
        }else{
            docType = "selectedImage";
            body.selectedImage = uploadDocument(req.body.selectedImage,docType);
        }
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
const uploadDocument = (doc,docType) => {

    let folderName = "";
    let DocPath = "";
    let DocData = doc;
    let base64Data = "";

    const saveFile = (folderName,DocData) => {
        DocPath = folderName + '/' + Date.now()+'.pdf';            
       
    
        if (!fs.existsSync(folderName)) {                
            fs.mkdirSync(folderName);
            fs.writeFileSync(DocPath, base64Data,  {encoding: 'base64'});                         
        }else{
            fs.writeFileSync(DocPath, base64Data,  {encoding: 'base64'});
        }       
        
        return DocPath;
    };

    switch(docType){
        case "selectedImage":            
            folderName = './image';        
            DocPath = saveFile(folderName,DocData); 
            break;

        default:            
        break;
    }    
    
    return DocPath;
     
}

