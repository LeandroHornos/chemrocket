//REACT
import React, { useEffect, useState } from "react";

// AXIOS
import axios from "axios";

// LAYOUT
import { GeneralLayout, CenteredColRow } from "../components/Layout";

// REACT TOASTIFY
import { toast } from "react-toastify";

const Todos = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/todo");
        setTodos(res.data);
        setLoading(false);
        // toast.success("Tus tareas se han cargado con éxito");
      } catch (err) {
          toast.error("Algo salio mal, prueba recargar la página")
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <CenteredColRow centerColClasses="d-flex flex-column align-items-center">
        {loading && <p>Cargando tareas...</p>}
      </CenteredColRow>
    );
  } else {
    return (
      <GeneralLayout>
        <CenteredColRow centerColClasses="d-flex flex-column align-items-center">
          <h1>Mis Tareas</h1>
          <p>
            Esta vista sirve de ejemplo para un get a la base de datos.
            <br />
            Se obtienen todas las tareas cuyo userId correspondan a la sesión
            actual.
          </p>
          <TodoList todos={todos} />
        </CenteredColRow>
      </GeneralLayout>
    );
  }
};

const TodoList = (props) => {
  const { todos } = props;
  // console.log("TodoList dice", todos);
  return (
    <React.Fragment>
      {todos.map((todo) => {
        return (
          <div
            key={todo._id}
            style={{ margin: "5px" }}
            className="d-flex justify-content-start align-items-left width100 shadow p-3 mb-5 bg-body rounded"
          >
            <ul style={{ listStyle: "none" }}>
              <li>
                <strong>Tarea:</strong> {todo.name}
              </li>
              <li>
                <strong>User Id:</strong> {todo.user}
              </li>
              <li>
                <strong>Fecha:</strong> {todo.updatedAt}
              </li>
            </ul>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Todos;
