import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'; // ✅ Add this if not in global setup
import App from "../App";

test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked();
});

test("toppings list initially contains only cheese", () => {
  render(<App />);
  const cheese = screen.getByText("Cheese");
  expect(cheese).toBeInTheDocument();
  const items = screen.getAllByRole("listitem");
  expect(items.length).toBe(1);
});

test("checkbox appears as checked when user clicks it", async () => {
  render(<App />);
  const user = userEvent.setup();
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  await user.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

test("topping appears in toppings list when checked", async () => {
  render(<App />);
  const user = userEvent.setup();
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  await user.click(addPepperoni);
  const items = screen.getAllByRole("listitem");
  expect(items.length).toBe(2);
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();
});

test("selected topping disappears when checked a second time", async () => {
  render(<App />);
  const user = userEvent.setup();
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

  // First click - add pepperoni
  await user.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.getByText("Pepperoni")).toBeInTheDocument();

  // Second click - remove pepperoni
  await user.click(addPepperoni);
  expect(addPepperoni).not.toBeChecked();
  expect(screen.getByText("Cheese")).toBeInTheDocument();
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});
