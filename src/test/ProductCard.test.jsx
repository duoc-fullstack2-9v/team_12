import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'

// 🔹 Mock del contexto (una sola vez al inicio)
vi.mock('../context/CartContext', () => ({
  useCart: vi.fn(),
}))

// 🔹 Datos de ejemplo
const mockProduct = {
  name: 'Producto de prueba',
  price: 9990,
  image: 'https://via.placeholder.com/150',
}

describe('ProductCard Component', () => {
  beforeAll(() => {
    // Mock de alert para evitar error en jsdom
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('renderiza correctamente la versión por defecto', () => {
    // Mock vacío (no necesitamos que haga nada)
    useCart.mockReturnValue({ addToCart: vi.fn() })

    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Producto de prueba')).toBeInTheDocument()
    expect(screen.getByText(/\$[\s]*9[.,]990/)).toBeInTheDocument()
    expect(screen.getByText('Agregar al carrito')).toBeInTheDocument()
  })

  test('renderiza correctamente la versión de página (variant="page")', () => {
    useCart.mockReturnValue({ addToCart: vi.fn() })

    render(<ProductCard product={mockProduct} variant="page" />)

    expect(screen.getByText('Producto de prueba')).toBeInTheDocument()
    expect(screen.getByText(/\$[\s]*9[.,]990/)).toBeInTheDocument()
    expect(screen.getByText('Agregar al carro')).toBeInTheDocument()
  })

  test('ejecuta addToCart al hacer click en el botón', () => {
    const addToCartMock = vi.fn()
    // ⬅️ usamos mockReturnValueOnce para definir el mock solo en este test
    useCart.mockReturnValueOnce({ addToCart: addToCartMock })

    render(<ProductCard product={mockProduct} />)
    fireEvent.click(screen.getByText('Agregar al carrito'))

    expect(addToCartMock).toHaveBeenCalledTimes(1)
    expect(addToCartMock).toHaveBeenCalledWith(mockProduct)
  })
})
