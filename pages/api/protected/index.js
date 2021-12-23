import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    res.send({ content: "Bienvenido a la página privada" });
  } else {
    res.send({ error: "Debes loguearte para acceder a esta página" });
  }
};
