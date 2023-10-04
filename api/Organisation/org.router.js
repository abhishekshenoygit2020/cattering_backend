const { createStudent, getStudentById,updatebyId, getStudentData,deleteById } = require('./org.controller');
const router = require("express").Router();

router.post("/add", createStudent)
        .get("/:id", getStudentById)
        .post("/:id/update", updatebyId)
        .get("/", getStudentData)
        .delete("/:id/delete",deleteById);


module.exports = router;


