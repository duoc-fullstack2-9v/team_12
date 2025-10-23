import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { BrowserRouter } from 'react-router-dom'

// 🔹 Mock de los contextos
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
}))

// 🔹 Función auxiliar para envolver en BrowserRouter
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('Header Component', () => {
  beforeAll(() => {
    // Mock de confirm para no interrumpir los tests
    vi.spyOn(window, 'confirm').mockImplementation(() => true)
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('renderiza correctamente el logo y los enlaces principales', () => {
    useAuth.mockReturnValue({ currentUser: null, logout: vi.fn() })
    useCart.mockReturnValue({ getCartCount: () => 2 })

    renderWithRouter(<Header />)

    // Logo
    expect(screen.getByAltText('Supreme Logo')).toBeInTheDocument()

    // Enlaces principales
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText(/Cart/)).toHaveTextContent('Cart (2)')

    // Enlaces de usuario no autenticado
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Registrar usuario')).toBeInTheDocument()
  })

  test('muestra oferta cuando showOffer es true', () => {
    useAuth.mockReturnValue({ currentUser: null, logout: vi.fn() })
    useCart.mockReturnValue({ getCartCount: () => 0 })

    renderWithRouter(<Header showOffer={true} />)

    expect(screen.getByText('Hasta 40% OFF')).toBeInTheDocument()
  })

  test('muestra saludo y botón de cerrar sesión cuando hay usuario', () => {
    const logoutMock = vi.fn()
    useAuth.mockReturnValue({
      currentUser: { nombre: 'Diego' },
      logout: logoutMock,
    })
    useCart.mockReturnValue({ getCartCount: () => 1 })

    renderWithRouter(<Header />)

    // Verificamos que el saludo esté
    expect(screen.getByText('Hola, Diego')).toBeInTheDocument()

    // Simulamos click en "Cerrar sesión"
    fireEvent.click(screen.getByText('Cerrar sesión'))

    // Confirmación del cierre
    expect(window.confirm).toHaveBeenCalled()
    expect(logoutMock).toHaveBeenCalledTimes(1)
  })
})
