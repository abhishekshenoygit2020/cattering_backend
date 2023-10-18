const { create, getById,updatebyId,getdatasolve, getData,deleteById } = require('./service.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id", getById)
        .post("/:id/update", updatebyId)
        .get("/", getData)
        .get("/get", getdatasolve)
        .delete("/:id/delete",deleteById);


module.exports = router;


