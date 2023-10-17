const { create, getProducts, getProductById, updateProduct, deleteProductById } = require("./product.services");
const { genSaltSync, hashSync} = require("bcrypt");
const { get } = require("express/lib/response");
var nodemailer = require('nodemailer');

module.exports = {
    createProduct:(req,res) => {
        const body = req.body;
        let docType = "";       
        uploadDocument(req.body.resumeDoc,"resumeDoc");
        
        
        if(body.image === ""){
        }else{
            docType = "image";
            body.image = uploadDocument(req.body.image,docType);
        }
        create(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getProductById:(req,res) => {
        const id = req.params.id;
        getProductById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getProducts:(req,res) => {        
        getProducts((err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     updateProduct:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updateProduct(body, id, (err, results) => {
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
     deleteProductById:(req,res) => {
        const id = req.params.id;
        deleteProductById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    error:err,
                    status:500
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
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
