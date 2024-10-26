import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

describe("Home component", () => {
  it("renders welcome message and buttons", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const welcomeMessage = screen.getByText(/Bienvenido a CoachPrime/i);
    expect(welcomeMessage).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    const registerButton = screen.getByRole("button", { name: /Registrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("navigates to login page when 'Iniciar sesión' button is clicked", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });
    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe("/login");
  });

  it("navigates to register page when 'Registrar' button is clicked", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const registerButton = screen.getByRole("button", { name: /Registrar/i });
    fireEvent.click(registerButton);
    expect(window.location.pathname).toBe("/register");
  });
});
