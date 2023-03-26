import { render, screen } from "@testing-library/react";
import App from "./index";

test("render page", () => {
  render(<App />);
  const element = screen.getByText("URL Checker");
  expect(element).toBeInTheDocument();
});
