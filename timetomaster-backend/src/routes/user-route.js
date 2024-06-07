import express from "express";
import * as userController from "./../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.route("/auth-user").post(userController.authUser);

userRouter.route("/").get(userController.index).post(userController.post);

userRouter
  .route("/:id")
  .get(userController.getById)
  .put(userController.updateReminder)
  .delete(userController.deleteReminder);

export default userRouter;


