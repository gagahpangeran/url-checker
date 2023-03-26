import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./index";

const setup = () => {
  const utils = render(<App />);
  const input = screen.getByPlaceholderText(
    "Enter your URL here"
  ) as HTMLInputElement;

  return {
    input,
    ...utils
  };
};

test("initial page", () => {
  const { input, getByText } = setup();

  const title = getByText("URL Checker");
  expect(title).toBeInTheDocument();

  expect(input).toBeInTheDocument();

  const description = getByText("Please enter a valid URL");
  expect(description).toBeInTheDocument();
});

test("check input text show correct value", async () => {
  const { input } = setup();

  fireEvent.change(input, { target: { value: "https://example.com" } });
  expect(input.value).toBe("https://example.com");
});

test("check description does not immediately change", async () => {
  const { input, getByText } = setup();

  fireEvent.change(input, { target: { value: "https://example.com" } });

  const description = getByText("Please enter a valid URL");
  expect(description).toBeInTheDocument();
});

test("check invalid URL", async () => {
  const { input, getByText } = setup();

  fireEvent.change(input, { target: { value: "htt" } });

  await waitFor(() => {
    const description = getByText("Invalid URL");
    expect(description).toBeInTheDocument();
  });
});

test("check URL does not exist", async () => {
  const { input, getByText } = setup();

  fireEvent.change(input, { target: { value: "https://example.com" } });

  await waitFor(() => {
    const description = getByText("This URL does not exist");
    expect(description).toBeInTheDocument();
  });
});

test("check URL is a file", async () => {
  const { input, getByText } = setup();

  fireEvent.change(input, {
    target: { value: "https://example.com/file.pdf" }
  });

  await waitFor(() => {
    const description = getByText("This URL is a file");
    expect(description).toBeInTheDocument();
  });
});

test("check URL is a folder", async () => {
  const { input, getByText } = setup();

  fireEvent.change(input, {
    target: { value: "http://example.com/folder/" }
  });

  await waitFor(() => {
    const description = getByText("This URL is a folder");
    expect(description).toBeInTheDocument();
  });
});
