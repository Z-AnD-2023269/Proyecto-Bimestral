"use strict";

import { hash, verify } from "argon2";
import User from "../models/User.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
    try {
        const { name, surname, email, username, password, phone, role } = req.body;
        const encryptedPassword = await hash(password);

        const user = await User.create({
            name,
            surname,
            email,
            username,
            password: encryptedPassword,
            phone,
            role,
        });

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                username: user.username,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al registrar usuario",
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({ 
            $or: [{ email }, { username }] });

        if (!user) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            userDetails: {
                token: token
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el inicio de sesión",
            error: err.message
        });
    }
}
