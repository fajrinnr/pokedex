import React from "react";
import { Pill } from "../src/components/pill";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Test of Pill Component", () => {
  test("Test the page has correct text", () => {
    const handleClick = jest.fn();
    render(<Pill text="Click Me!" onClickPill={handleClick} />);
    fireEvent.click(screen.getByText(/Click Me!/i));
    fireEvent.click(screen.getByText(/Click Me!/i));
    expect(handleClick).toHaveBeenCalledTimes(2);
    expect(screen.getByText(/Click Me!/i)).toBeInTheDocument();
  });
});
