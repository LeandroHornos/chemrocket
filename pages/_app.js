// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.css";

// CUSTOM STYLES

import "../styles/kekule.css";
import "../styles/kekule-custom.css";
import "../styles/globals.css";


// NEXT AUTH
import { Provider } from "next-auth/client";

// REACT TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
