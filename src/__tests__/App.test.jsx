import App from "../App";
import { it, describe } from "vitest";
import { render, screen } from "@testing-library/react";

describe("App.js", () => {
  it("Check if the App renders", () => {
    //render our App properly
    render(<App />);
    screen.debug();
  });
});
