import React from "react";

import Link from "next/link";

import { useSession } from "next-auth/client";
import Image from "next/image";

import logo from "../images/rocket.svg";

const Nav = () => {
  const [session, loading] = useSession();
  if (!session) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            <Image
              src={logo}
              alt=""
              width={24}
              height={24}
              className="d-inline-block align-text-top"
            ></Image>
            Brand
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/dashboard">
                <a className="nav-link active" aria-current="page">
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/todo">
                <a className="nav-link active" aria-current="page">
                  ToDos
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/todos-example">
                <a
                  className="nav-link disabled"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={session.user.image}
              alt={session.user.name}
              className="img-fluid rounded-circle"
              width={35}
              height={35}
            />
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <p className="width100" style={{ padding: "5px 20px" }}>
                {session.user.name}
              </p>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <Link href="/api/auth/signout">
                <a className="nav-link active" aria-current="page">
                  Salir
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
