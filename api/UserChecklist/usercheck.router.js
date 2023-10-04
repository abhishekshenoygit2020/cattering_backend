const { create, getById,updatebyId, getData,deleteById, gettitleDatas,incrementCountSubmits } = require('./usercheck.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id", getById)
        .post("/:id/update", updatebyId)
        .get("/", getData)
        .post("/getTitleDatas", gettitleDatas)
        .delete("/:id/delete",deleteById)
      
module.exports = router;