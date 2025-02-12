"use strict";

import { Router } from "express";
import { getUserByIdValidator, getUsersValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validator.js";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser } from "./user.controller.js";

const router = Router();

// Obtener usuario por ID con validación
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

// Obtener todos los usuarios con paginación
router.get("/", getUsersValidator, getUsers);

// Eliminar usuario con validación
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

// Actualizar usuario con validación
router.put("/updateUser/:uid", updateUserValidator, updateUser);

// Actualizar contraseña con validación
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

export default router;
