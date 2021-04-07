import React from "react";
import { CardPokemon } from "../src/components/cardPokemon";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Link from "next/link";
import { render, screen } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe("Test of <CardPokemon />", () => {
  test("Test the page redirect to /pokemon-details/${pokemon-name}", async () => {
    const wrapper1 = mount(<CardPokemon name={"bulbasaur"} />);
    const wrapper2 = mount(<CardPokemon name={"pikachu"} />);
    const wrapper3 = mount(<CardPokemon name={"charmander"} />);
    const href1 = wrapper1.find(Link).at(0).props().href;
    const href2 = wrapper2.find(Link).at(0).props().href;
    const href3 = wrapper3.find(Link).at(0).props().href;
    expect(href1).toBe("/pokemon-details/bulbasaur");
    expect(href2).toBe("/pokemon-details/pikachu");
    expect(href3).toBe("/pokemon-details/charmander");
  });

  test("Test the page has correct text", () => {
    render(<CardPokemon name={"bulbasaur"} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/total owned/i)).toBeInTheDocument();
  });

  test("Test the page has correct image", () => {
    render(<CardPokemon name={"bulbasaur"} />);
    expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument();
  });
});
