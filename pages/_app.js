import "../styles/globals.css";
import withData from "../config/apollo";
import MyPokemonContext from "../src/contexts/myPokemonContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);
  return (
    <MyPokemonContext>
      <Component {...pageProps} />
    </MyPokemonContext>
  );
}

export default withData(MyApp);
