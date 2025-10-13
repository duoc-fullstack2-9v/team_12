// Regex para validaciones
export const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,10}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validar nombre
export const validateName = (name) => {
  if (!name.trim()) {
    return 'El nombre es requerido.';
  }
  if (!nameRegex.test(name)) {
    return 'El nombre debe tener solo letras y entre 3 y 10 caracteres.';
  }
  return null;
};

// Validar email
export const validateEmail = (email) => {
  if (!email.trim()) {
    return 'El correo es requerido.';
  }
  if (!emailRegex.test(email)) {
    return 'Correo inválido.';
  }
  return null;
};

// Validar contraseña
export const validatePassword = (password) => {
  if (!password.trim()) {
    return 'La contraseña es requerida.';
  }
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }
  return null;
};

// Validar que dos campos coincidan
export const validateMatch = (field1, field2, fieldName) => {
  if (field1 !== field2) {
    return `Los ${fieldName} no coinciden.`;
  }
  return null;
};