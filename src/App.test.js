import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("renders home page heading", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/welcome to bookstore/i)
  ).toBeInTheDocument();
});
