import React from "react";
import Head from "next/head";

import Nav from "../components/Nav";

export const FlexRowLg10 = (props) => {
  {
    /*Este componente de */
  }
  return (
    <div className={"row" + " " + props.rowClasses}>
      <div className="col-lg-1"></div>
      <div className="col-lg-10">{props.children}</div>
      <div className="col-lg-1"></div>
    </div>
  );
};

export const FlexRow3ColLg = (props) => {
  {
    /*Este componente de */
  }
  return (
    <div className={"row" + " " + props.rowClasses}>
      <div className={"col-lg-" + props.col1 + " " + props.col1Classes}></div>
      <div className={"col-lg-" + props.col2 + " " + props.col2Classes}>
        {props.children}
      </div>
      <div className={"col-lg-" + props.col3 + " " + props.col3Classes}></div>
    </div>
  );
};

export const CenteredColRow = (props) => {
  {
    /*Este componente devuelve una Row de bootstrap, con 3 cols,
    una central que lleva el contenido y dos laterales que hacen de borde.
    centerColSize= número de columnas de ancho de la columna central

    PROPS: 
    breakpoint: "sm" / "md" / "lg", string
    centerColSize: 1 a 12 int, ancho de la columna central de bootrap grid
    rowClasses: string, clases que se agregan al className del div de clase row
    centerColClasses: string, clases que se agregan al className del div de la col central

    ejemplo:
    breakpoint="md" centerColSize={8} centerColClasses="min80 d-flex flex-column justify-content-between align-items-center"
    */
  }
  const { centerColSize, rowClasses, centerColClasses, sideColClasses } = props;
  const bp = props.breakpoint;
  const left = Math.floor((12 - centerColSize) / 2);
  const right = 12 - centerColSize - left;

  return (
    <div className={"row" + " " + rowClasses}>
      <div className={`col-${bp}-${left}` + " " + sideColClasses}></div>
      <div className={`col-${bp}-${centerColSize}` + " " + centerColClasses}>
        {props.children}
      </div>
      <div className={`col-${bp}-${right}` + " " + sideColClasses}></div>
    </div>
  );
};

CenteredColRow.defaultProps = {
  centerColSize: 6,
  breakpoint: "md",
  rowClasses: "",
  centerColClasses: "",
  sideColClasses: "",
};

// LAYOUTS

/* Los siguientes componentes se utilizan para dar estructura general a la web.
Contienen un nav y un footer además del head correspondiente, que carga las 
etiquetas meta así como los links y scripts. 
Cuando se crea el componente de una página, retornar un layout y el contenido
como children */

export const GeneralLayout = (props) => {
  /* Estuctura general para las páginas del sitio */

  const { children } = props;

  return (
    <React.Fragment>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
          integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
          integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
          crossorigin="anonymous"
        ></script>
        <title>NextJs Base App</title>
        <meta
          name="description"
          content="Aplicacion de NextJS base para ser usada en proyectos diversos. Aporta maneo de sesiones via oauth con nextauth y provee una base de datos sencilla en sqlite"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="cointainer min100">
        {children}
        <footer>
          <div className="row min20">
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
              <a
                href="https://www.leandrohornos.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                created by Leandro Hornos
              </a>
            </div>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export const BlankLayout = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
          integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
          integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
          crossorigin="anonymous"
        ></script>
        <title>NextJs Base App</title>
        <meta
          name="description"
          content="Aplicacion de NextJS base para ser usada en proyectos diversos. Aporta maneo de sesiones via oauth con nextauth y provee una base de datos sencilla en sqlite"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="cointainer min100">{children}</div>
    </React.Fragment>
  );
};
