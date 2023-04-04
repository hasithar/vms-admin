import Login from "../Auth/Login/Login";
import { it, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/utils/test-utils";
import { MemoryRouter } from "react-router-dom";

const getUsernameInput = () => {
  return screen.getByLabelText(/Username/i);
};

const getPasswordInput = () => {
  return screen.getByLabelText("Password");
};
const getPasswordToggleButton = () => {
  return screen.getByRole("button", { name: /toggle password visibility/i });
};

const getSubmitButton = () => {
  return screen.getByRole("button", { name: /sign in/i });
};

describe("Login.js", () => {
  // check if render properly
  it("should render properly", () => {
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    // screen.debug();

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Forgot Password\?/i })
    ).toBeInTheDocument();

    const usernameInput = getUsernameInput();
    expect(usernameInput).toBeInTheDocument();

    const passwordInput = getPasswordInput();
    expect(passwordInput).toBeInTheDocument();

    const passwordToggle = getPasswordToggleButton();
    expect(passwordToggle).toBeInTheDocument();

    const submitButton = getSubmitButton();
    expect(submitButton).toBeInTheDocument();
  });

  // check password toggle
  describe("when user clicks password visibility toggle", () => {
    it("should show password text", () => {
      renderWithProviders(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      const toggleButton = getPasswordToggleButton();
      const passwordInput = getPasswordInput();

      expect(passwordInput).toHaveAttribute("type", "password");

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "text");

      fireEvent.click(toggleButton);
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  // check login
  describe("when user trying to log in", () => {
    describe("when user enter incorrect username", () => {
      it("should display invalid user message", async () => {
        const testUser = {
          username: "wrong user",
          password: "wrong pass",
        };

        renderWithProviders(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );

        // get inputs
        const usernameInput = getUsernameInput();
        const passwordInput = getPasswordInput();

        // simulate user input
        fireEvent.change(usernameInput, {
          target: { value: testUser.username },
        });
        fireEvent.change(passwordInput, {
          target: { value: testUser.password },
        });

        // click the submit button
        const submitButton = getSubmitButton();
        fireEvent.click(submitButton);

        // verify result
        const errorMessage = await screen.findByText(/user does not exists/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    describe("when user enter incorrect password", () => {
      it("should display invalid credentails message", async () => {
        const testUser = {
          username: "hasitha",
          password: "wrong pass",
        };

        renderWithProviders(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );

        // get inputs
        const usernameInput = getUsernameInput();
        const passwordInput = getPasswordInput();

        // simulate user input
        fireEvent.change(usernameInput, {
          target: { value: testUser.username },
        });
        fireEvent.change(passwordInput, {
          target: { value: testUser.password },
        });

        // click the submit button
        const submitButton = getSubmitButton();
        fireEvent.click(submitButton);

        // verify result
        const errorMessage = await screen.findByText(/Invalid credentials/i);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
