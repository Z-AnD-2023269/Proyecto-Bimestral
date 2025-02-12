"use strict";

import { hash, verify } from "argon2";
import User from "../models/User.js";

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, surname, username, password, email, phone, role } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await hash(password);

    // Crear nuevo usuario
    const newUser = new User({
      name,
      surname,
      username,
      password: hashedPassword,
      email,
      phone,
      role,
    });

    // Guardar en la base de datos
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el usuario",
      error: err.message,
    });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no existe",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
      error: err.message,
    });
  }
};

// Obtener todos los usuarios con paginación
export const getUsers = async (req, res) => {
  try {
    const { limit = 3, from = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(from)).limit(Number(limit)),
    ]);

    return res.status(200).json({
      success: true,
      total,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al listar los usuarios",
      error: err.message,
    });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name, email, username } = req.body;

    const user = await User.findByIdAndUpdate(
      uid,
      { name, email, username },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Usuario actualizado exitosamente",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el usuario",
      error: err.message,
    });
  }
};

// Eliminar usuario (cambio de estado en lugar de borrar)
export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Usuario eliminado",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
      error: err.message,
    });
  }
};

// Actualizar contraseña del usuario
export const updatePassword = async (req, res) => {
  try {
    const { uid } = req.params;
    const { newPassword } = req.body;

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const matchPassword = await verify(user.password, newPassword);
    if (matchPassword) {
      return res.status(400).json({
        success: false,
        message: "La nueva contraseña no puede ser igual a la anterior",
      });
    }

    const encryptedPassword = await hash(newPassword);
    await User.findByIdAndUpdate(uid, { password: encryptedPassword });

    return res.status(200).json({
      success: true,
      message: "Contraseña actualizada",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar la contraseña",
      error: err.message,
    });
  }
};
