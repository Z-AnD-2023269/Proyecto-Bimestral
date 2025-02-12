"use strict";

import { param, body, query } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

// Validación para obtener un usuario por ID
export const getUserByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

// Validación para obtener todos los usuarios con paginación
export const getUsersValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    query("limit").optional().isInt({ min: 1 }).withMessage("El límite debe ser un número entero mayor a 0"),
    query("from").optional().isInt({ min: 0 }).withMessage("El valor 'from' debe ser un número entero mayor o igual a 0"),
    validarCampos,
    handleErrors
];

// Validación para eliminar usuario
export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

// Validación para actualizar usuario
export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("name").optional().isString().withMessage("El nombre debe ser una cadena de texto"),
    body("email").optional().isEmail().withMessage("El email debe ser válido"),
    body("username").optional().isString().withMessage("El nombre de usuario debe ser una cadena de texto"),
    validarCampos,
    handleErrors
];

// Validación para actualizar la contraseña del usuario
export const updatePasswordValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("newPassword")
        .isString()
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];
