const { create, getById,updatebyId, getData,deleteById,getHeader } = require('./header.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id", getById)
        .post("/:id/update", updatebyId)
        .get("/", getData)
        .post("/", getData)
        .post("/data", getHeader)
        .delete("/:id/delete",deleteById);


module.exports = router;


