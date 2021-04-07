import React from "react";
import Header, { HeaderPokemonDetail } from "../src/components/header";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Test of Header Components", () => {
  test("Test the page has correct image", () => {
    render(<Header />);
    expect(screen.getByAltText(/pokedex/i)).toBeInTheDocument();
  });

  test("Test the page has correct image", () => {
    const handleClick = jest.fn();
    render(<HeaderPokemonDetail id={200} onClick={handleClick} />);
    fireEvent.click(screen.getByAltText(/arrow left/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText(/arrow left/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
  });
});
