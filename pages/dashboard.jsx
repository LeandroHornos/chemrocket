// NextJS

// Next Auth
import { getSession, signOut } from "next-auth/client";

import Link from "next/link";

import { GeneralLayout, CenteredColRow } from "../components/Layout";
export default function Dashboard() {
  return (
    <GeneralLayout>
      <CenteredColRow centerColSize={8} breakpoint="md">
        <div className="min80 d-flex flex-column justify-content-between align-items-center">
          <h1 className="text-center">Dashboard</h1>
          <Link href="/protected">Ver página protegida</Link>
        </div>
      </CenteredColRow>
    </GeneralLayout>
  );
}

// Ruta protegida: sólo se puede acceder estando logueado, si no estás logueado
// te redirecciona al login

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
