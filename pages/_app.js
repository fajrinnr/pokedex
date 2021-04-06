import "../styles/globals.css";
import "@brainhubeu/react-carousel/lib/style.css";
import client from "../config/apollo";
import { ApolloProvider } from "@apollo/client";
import MyPokemonContext from "../src/contexts/myPokemonContext";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <MyPokemonContext>
        <Component {...pageProps} />
      </MyPokemonContext>
    </ApolloProvider>
  );
}

export default MyApp;
