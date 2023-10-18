const { create, getById,updatebyId,getdatasolve,serviceData, getData,deleteById } = require('./service.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id", getById)
        .post("/:id/update", updatebyId)
        .get("/", getData)//to display only pending
        .get("/solve", getdatasolve)//to display solved
        .get("/service", serviceData)//to display both
        .delete("/:id/delete",deleteById);


module.exports = router;


