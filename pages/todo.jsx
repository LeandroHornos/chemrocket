// REACT HOOK FORM
import { useForm } from "react-hook-form";

// NEXT AUTH
import { getSession } from "next-auth/client";

// LAYOUT
import { GeneralLayout, CenteredColRow } from "../components/Layout";

// AXIOS
import axios from "axios";

// REACT TOASTIFY
import { toast } from "react-toastify";

export default function ToDo() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data, e) => {
    console.log(data);
    try {
      console.log("Salvando...");
      const res = await axios.post("/api/todo", { todo: data.name });
      toast.success(res.data.msg);
      reset("", {
        keepValues: false,
      });
      return;
    } catch (err) {
      toast.error(err.response.data.msg);
      reset("", {
        keepValues: false,
      });
    }
  };

  return (
    <GeneralLayout>
      <main>
        <CenteredColRow
          breakpoint="md"
          centerColSize={6}
          centerColClasses="min80 d-flex flex-column justify-content-start align-items-center"
        >
          <h1>Nueva tarea</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="width100">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                {...register("name")}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Guardar
            </button>
          </form>
        </CenteredColRow>
      </main>
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
