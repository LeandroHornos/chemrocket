/* 

PROTECTED PAGE
--------------

Ese es un ejemplo de una url protegida. 
Solo puede accederse a ella si se ha iniciado sesión
Esta página tiene su correspondiente endpoint en la api
ubicado en /api/protected/

Para otras rutas protegidas, seguir el mismo esquema de 
/api/protected/index.js, decidiendo si se retorna el contenido
en base a si hay una sesion activa, via getSession().

Aquí usamos el hook useSession para acceder a la sessión actual
Por lo tanto, el chequeo es doble:
· El front end chequea si existe una sesión y en base a eso decide
  si renderizar o no la página
· El backend chequea si existe una sesión y en base a eso decide
  si devolver o no el contenido de la página

____________________________
user-profile
____________________________

En esta vista se muestra la información de perfil del usuario, y se permite editar el contenido.
Puede ser una vista opcional, o bien la vista principal para los contactos del usuario (ej perfil de red social)

*/
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import {
  BlankLayout,
  GeneralLayout,
  CenteredColRow,
} from "../components/Layout";

export default function UserProfile() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };

    fetchData();
  }, [session]);

  const updateProfile = (newData) => {
    console.log("new data", newData);
  };

  // Si la página no se renderizó no se muestra nada
  if (typeof window !== "undefinded" && loading) {
    return null;
  }
  // Si no se inició se sesión se muestra un mensaje de error
  if (!session) {
    return (
      <BlankLayout>
        <CenteredColRow centerColSize="6" breakpoint="md">
          <div>
            <h1>No estas logueado!</h1>
            <Link href="/">
              <a>Ir al inicio</a>
            </Link>
          </div>
        </CenteredColRow>
      </BlankLayout>
    );
  } else {
    return (
      <GeneralLayout>
        <CenteredColRow centerColSize="6" breakpoint="md">
          <div>
            <h1>Peter Cantropus</h1>
            <form action={() => newData}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input type="text" name="" id="username" class="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">Nombre</label>
                <input
                  type="text"
                  name=""
                  id="firstname"
                  class="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Apellido</label>
                <input
                  type="text"
                  name="description"
                  id="lastname"
                  class="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                className="form-control"
                  name="description"
                  id="description"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
            </form>
          </div>
        </CenteredColRow>
      </GeneralLayout>
    );
  }
}
