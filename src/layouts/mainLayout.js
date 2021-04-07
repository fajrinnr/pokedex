import MetaTags from "./metaTags";
import MenuBar from "../components/menuBar";
import Header, { HeaderPokemonDetail } from "../components/header";

export default function MainLayout(props) {
  return (
    <div>
      <MetaTags currentURL={props.currentURL} />
      {!props?.noHeader ? (
        <Header />
      ) : (
        <HeaderPokemonDetail id={props.pokemonId} />
      )}
      {props.children}
      <MenuBar />
    </div>
  );
}
