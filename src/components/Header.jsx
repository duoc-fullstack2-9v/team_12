import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

const Header = ({ showOffer = false }) => {
  const { currentUser, logout } = useAuth();
  const { getCartCount } = useCart();

  const handleLogout = () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      logout();
    }
  };

  return (
    <header>
      <img
        src="/Supreme-logo-newyork.png"
        alt="Supreme Logo"
        width="150"
        height="100"
      />

      {showOffer && (
        <a href="#" className="oferta">
          Hasta 40% OFF
        </a>
      )}

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="#">Sobre Nosotros</Link>
        <Link to="#">Contacto</Link>
        <Link to="#">🛒 Cart ({getCartCount()})</Link>
      </nav>

      <div className="user-actions">
        {currentUser ? (
          <>
            <span style={{ color: "white" }}>Hola, {currentUser.nombre}</span>
            <span style={{ color: "white" }}> / </span>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
                textDecoration: "underline",
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login">
              Iniciar sesión
            </Link>
            <span style={{ color: "white" }}>/</span>
            <Link to="/registro" className="register">
              Registrar usuario
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
