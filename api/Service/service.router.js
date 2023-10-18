const { create, getById,updatebyId,getdatasolve,serviceData, getData,deleteById } = require('./service.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id/get", getById)        
        .get("/", getData)
        .post("/:id/update", updatebyId)
        .get("/getdatasolve", getdatasolve)
        .get("/serviceData", serviceData)//to display both
        .delete("/:id/delete",deleteById);



      
module.exports = router;


