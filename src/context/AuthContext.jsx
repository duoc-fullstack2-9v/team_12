import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Cargar usuario actual del localStorage si existe
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Obtener todos los usuarios de localStorage
  const getUsers = () => {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
  };

  // Guardar un nuevo usuario
  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('usuarios', JSON.stringify(users));
  };

  // Buscar usuario por email
  const findUser = (email) => {
    const users = getUsers();
    return users.find(u => u.email.trim().toLowerCase() === email.trim().toLowerCase());
  };

  // Registro de usuario
  const register = (userData) => {
    const { nombre, email, password, tel } = userData;
    
    if (findUser(email)) {
      throw new Error('Este correo ya está registrado.');
    }

    saveUser({ nombre, email, password, tel });
    return true;
  };

  // Login de usuario
  const login = (email, password) => {
    const user = findUser(email);
    
    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    if (user.password !== password) {
      throw new Error('Contraseña incorrecta.');
    }

    // Guardar usuario actual
    const userSession = { nombre: user.nombre, email: user.email };
    setCurrentUser(userSession);
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    
    return userSession;
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};