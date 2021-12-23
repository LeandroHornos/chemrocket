/* 
ToDo: Ejemplo
-----------------
Esta ruta de la api sirve de ejemplo de operaciones CRUD
con la base de datos. Puede usarse para testear la configuración
del template antes de comenzar un proyecto.
*/

import connectDB from "../../../config/connectDB";
import Todos from "../../../models/todoModel";

import { getSession } from "next-auth/client";

connectDB();

export default async function handler(req, res) {
  console.log("Handler dice ola");
  switch (req.method) {
    case "POST":
      createTodo(req, res);
      break;
    case "GET":
      getTodos(req, res);
      break;
  }
}

export async function createTodo(req, res) {
  // console.log("createTodo saluda!");
  // console.log(req.body);
  // console.log(req.method);
  // Crea una nueva tarea en la base de datos
  try {
    const session = await getSession({ req });

    console.log({ session, todo: req.body });
    if (!session) {
      return res
        .status(400)
        .json({ msg: "Error de autenticación. ¿Quién eres, qué haces aquí?" });
    }
    const { todo } = req.body;
    const { userId } = session;

    if (!todo) {
      return res.status(400).json({
        msg: "No se ha recibido nada en el request",
      });
    }

    const newTodo = new Todos({
      name: todo.toLowerCase(),
      user: userId,
    });

    await newTodo.save();
    res.json({
      msg: "Felicitaciones, la tarea se ha creado con exito",
    });
  } catch (err) {
    console.log("oops, ocurrió un error");
    res.status(500).json({ msg: err.message });
  }
}

export async function getTodos(req, res) {
  // Obtiene todos los ToDos del usuario logueado
  console.log("get todos saluda!");

  try {
    // Obtener la sesión
    const session = await getSession({ req });
    // Si no hay sesión, retornar error
    if (!session) {
      return res
        .status(400)
        .json({ msg: "Authentication Error. ¿Who are you?" });
    }
    // Obtengo el id del usuario y hago la query
    const { userId } = session;
    const todos = await Todos.find({ user: userId });
    res.json(todos);
  } catch (err) {
    console.log("oops, ocurrió un error");
    res.status(500).json({ msg: err.message });
  }
}
