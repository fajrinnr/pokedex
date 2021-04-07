import React from "react";
import MenuBar from "../src/components/menuBar";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Link from "next/link";
import { render, screen } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe("Test of <MenuBar />", () => {
  test("Test the page redirect to /", async () => {
    const wrapper = mount(<MenuBar />);
    const href = wrapper.find(Link).at(0).props().href;

    expect(href).toBe("/");
  });

  test("Test the page redirect to /mypokemon", async () => {
    const wrapper = mount(<MenuBar />);
    const href = wrapper.find(Link).at(1).props().href;

    expect(href).toBe("/mypokemon");
  });

  test("Test the page has correct text", () => {
    render(<MenuBar />);
    expect(screen.getByText(/My Pokemon/i)).toBeInTheDocument();
    expect(screen.getByText(/Pokemon List/i)).toBeInTheDocument();
  });

  test("Test the page has correct image", () => {
    render(<MenuBar />);
    expect(screen.getByAltText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Poke Ball/i)).toBeInTheDocument();
  });
});
