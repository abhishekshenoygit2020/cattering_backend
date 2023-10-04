const { create, getById,updatebyId, getData,deleteById, gettitleDatas, incrementCountSubmit } = require('./title.controller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id", getById)
        .post("/:id/incount", incrementCountSubmit)
        .post("/:id/update", updatebyId)
        .get("/", getData)
        .post("/getTitleDatas", gettitleDatas)
        .delete("/:id/delete",deleteById);
        

module.exports = router;
                                

