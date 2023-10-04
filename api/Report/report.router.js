const { create, getById,updatebyId, getData,deleteById } = require('./report.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id", getById)
        .post("/:id/update", updatebyId)
        .get("/", getData)
        .delete("/:id/delete",deleteById);


module.exports = router;


