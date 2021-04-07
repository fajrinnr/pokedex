import Swal from "sweetalert2";
import { formatStringFromString } from "./formatter";

function getProbabilityCatch() {
  let probability = Math.floor(Math.random() * 2);
  if (probability === 1) {
    return true;
  }
  return false;
}

export function getMyPokemons() {
  let myPokemons;
  if (!localStorage.myPokemons) {
    myPokemons = [];
  } else {
    myPokemons = JSON.parse(localStorage.myPokemons);
  }
  return myPokemons;
}

export function addMyPokemon(pokemon) {
  localStorage.setItem("myPokemons", JSON.stringify(pokemon));
}

export function releasePokemon(pokemonNickname, cb) {
  Swal.fire({
    title: `Are you sure want to release ${pokemonNickname}?`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Release",
  }).then((result) => {
    if (result.isConfirmed) {
      let updatedPokemons = getMyPokemons().filter((pokemon) => {
        return pokemon.nickname !== pokemonNickname;
      });
      cb();
      addMyPokemon(updatedPokemons);
    }
  });
}

export function countTotalOwnedPokemon(pokemonList, pokemonName) {
  let count = 0;
  pokemonList?.forEach((pokemon) => {
    if (pokemon.name === pokemonName) {
      count++;
    }
  });
  return count;
}

export async function catchPokemon(pokemonName, pokemonImage, pokemonId) {
  let myPokemons = getMyPokemons();

  if (getProbabilityCatch()) {
    const { value: nickname } = await Swal.fire({
      title: `Yeay! you caught a ${formatStringFromString(pokemonName)}`,
      input: "text",
      inputLabel: `Enter nickname for ${formatStringFromString(pokemonName)}:`,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        } else {
          if (myPokemons.some((pokemon) => pokemon.nickname === value)) {
            return "Nickname already in use";
          } else {
            myPokemons.push({
              id: pokemonId,
              image: pokemonImage,
              name: pokemonName,
              nickname: value,
            });
            addMyPokemon(myPokemons);
          }
        }
      },
    });
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    if (nickname) {
      Toast.fire({
        icon: "success",
        title: `Successfully catch ${pokemonName} with Nickname ${nickname}`,
      });
    }
  } else {
    return Swal.fire({
      title: `Oops, you failed to catch ${formatStringFromString(pokemonName)}`,
      text: "Keep trying!:)",
      imageUrl: "https://media2.giphy.com/media/ic0iE4NVz0vGiNpxjd/source.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  }
}

export function countTotalStatsPokemon(pokemonStats) {
  let totalStats = 0;
  pokemonStats.forEach((stat) => {
    totalStats += stat.base_stat;
  });
  return totalStats;
}
