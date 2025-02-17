"use strict";

import { Router } from "express";
import { deleteUserValidator, getUserByIdValidator, getUsersValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validator.js";
import { deleteUser, getUserById, getUsers, updatePassword, updateUser } from "./user.controller.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);

router.get("/", getUsersValidator, getUsers);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

router.put("/updateUser/:uid", updateUserValidator, updateUser);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

export default router;
