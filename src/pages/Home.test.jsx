import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import Home from './Home'

describe('Home Page', () => {
  test('renderiza el contenido principal de la página Home', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Home />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    )

    // ✅ Busca un texto que sí está visible en Home.jsx
    expect(screen.getByText(/destacado/i)).toBeInTheDocument()
  })
})
