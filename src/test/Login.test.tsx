import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import { loginUser } from "../services/api";

jest.mock("../services/api");

describe("Login component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form with email and password inputs", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("displays error message when credentials are incorrect", async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid credentials")
    );

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "incorrectPassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Credenciales incorrectass/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("logs in successfully with correct credentials", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({ token: "mockToken" });

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(
        "test@example.com",
        "Password123!"
      );
    });
  });
});
