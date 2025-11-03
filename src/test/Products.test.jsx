import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import Products from "../pages/Products";
import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";

describe("Products Page", () => {
  test("renderiza la página de productos", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Products />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    // Usamos getAllByText porque hay varios "Productos"
    const elementos = screen.getAllByText(/productos/i);
    expect(elementos.length).toBeGreaterThan(0);
  });
});
