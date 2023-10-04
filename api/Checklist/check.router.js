const { create, getById,updatebyId, getData,deleteById ,getquenstion,getType, incrementCountSubmit} = require('./check.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id", getById)
        .post("/:id/update", updatebyId)
        .post("/", getData)
        .delete("/:id/delete",deleteById)
        .post("/data",getquenstion)
        .post("/type",getType)
        .get("/:id/update",incrementCountSubmit);


module.exports = router;


