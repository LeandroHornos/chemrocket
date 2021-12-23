import React, { useEffect } from "react";
import { BlankLayout, CenteredColRow } from "../components/Layout";

import { signIn, signOut, providers, getSession } from "next-auth/client";

import Router from "next/router";

// REACT HOOK FORM
import { useForm } from "react-hook-form";

const Login = ({ providers, session }) => {
  const { register, handleSubmit, reset } = useForm();

  const provs = Object.values(providers);
  useEffect(() => {
    if (session) {
      return Router.push("/dashboard");
    }
  }, [session]);

  const onSubmit = async ({ email }) => {
    await signIn("email", { email });
  };

  return (
    <BlankLayout>
      <CenteredColRow
        breakpoint="md"
        centerColSize={6}
        centerColClasses="min80 d-flex flex-column align-items-center justify-content-between"
      >
        <h1>Ingresar</h1>

        <div className="width100">
          <div className="d-grid gap-2 col-8 mx-auto">
            <p>Utiliza tu servicio favorito para autenticarte</p>
          </div>
          {provs.map((provider) => {
            // El login con Email es tratado aparte
            if (provider.id == "email") {
              return;
            }
            // Login con OAuth de terceros
            return (
              <div key={provider.name} className="d-grid gap-2 col-8 mx-auto">
                <button
                  className="btn btn-dark"
                  onClick={() => signIn(provider.id)}
                >
                  Ingresar con {provider.name}
                </button>
              </div>
            );
          })}
          <div className="d-grid gap-2 col-8 mx-auto">
            <hr />
            <p>O ingresa con un Magic Link en tu Email</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  {...register("email")}
                  placeholder="name@domain.com"
                />
              </div>
              <button
                type="submit"
                className="form-control btn btn-outline-dark"
              >
                Ingresar con Email
              </button>
            </form>
          </div>
        </div>
      </CenteredColRow>
    </BlankLayout>
  );
};

Login.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    session: await getSession(context),
  };
};

export default Login;
