const userController = require("../controllers/user");

const router = require("express").Router();

router.get("/getusers", userController.getUsers);

router.post("/addnewusers", userController.addNewUser);

router.put("/updateuser/:userId", userController.updateUser);

router.delete("/deleteuser/:userId", userController.deleteUser);

module.exports = router;
