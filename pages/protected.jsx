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

*/
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import {
  BlankLayout,
  GeneralLayout,
  CenteredColRow,
} from "../components/Layout";

export default function Protected() {
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
            <h1>Enhorabuena!</h1>
            <p>
              Estás viendo una página privada. El contenido que aquí se muestra
              sólo puede ser visto si has iniciado sesión
            </p>
          </div>
        </CenteredColRow>
      </GeneralLayout>
    );
  }
}
