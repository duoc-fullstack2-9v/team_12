import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { validateName, validateEmail, validatePassword, validateMatch } from '../utils/validation';
import '../styles/style.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    correo2: '',
    pass: '',
    pass2: '',
    tel: '',
    region: '',
    comuna: ''
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    const nameError = validateName(formData.nombre);
    if (nameError) {
      alert(nameError);
      return;
    }

    const emailError = validateEmail(formData.correo);
    if (emailError) {
      alert(emailError);
      return;
    }

    const emailMatchError = validateMatch(formData.correo, formData.correo2, 'correos');
    if (emailMatchError) {
      alert(emailMatchError);
      return;
    }

    const passwordError = validatePassword(formData.pass);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    const passwordMatchError = validateMatch(formData.pass, formData.pass2, 'contraseñas');
    if (passwordMatchError) {
      alert(passwordMatchError);
      return;
    }

    // Intentar registrar
    try {
      register({
        nombre: formData.nombre,
        email: formData.correo,
        password: formData.pass,
        tel: formData.tel
      });
      
      alert('Registro exitoso. ¡Ya puedes iniciar sesión!');
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <Header />

      <main>
        <form className="form-registro" onSubmit={handleSubmit}>
          <h2>Registro de usuario</h2>

          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            pattern="[A-Za-zÀ-ÿ\s]{3,10}"
            title="Solo letras, mínimo 3 caracteres y máximo 10"
            minLength="3"
            maxLength="10"
          />

          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            title="Formato inválido, asegúrate de ingresar un correo válido"
          />

          <label htmlFor="correo2">Confirmar correo</label>
          <input
            type="email"
            id="correo2"
            name="correo2"
            value={formData.correo2}
            onChange={handleChange}
            required
          />

          <label htmlFor="pass">Contraseña</label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            required
          />

          <label htmlFor="pass2">Confirmar contraseña</label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            value={formData.pass2}
            onChange={handleChange}
            required
          />

          <label htmlFor="tel">Teléfono (opcional)</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
          />

          <div className="selects">
            <select name="region" value={formData.region} onChange={handleChange} required>
              <option value="">-- Selecciona tu región --</option>
              <option>Región Metropolitana de Santiago</option>
              <option>Región de Atacama</option>
              <option>Región de Ñuble</option>
            </select>

            <select name="comuna" value={formData.comuna} onChange={handleChange} required>
              <option value="">-- Selecciona la comuna --</option>
              <option>Linces</option>
              <option>Llay-Llay</option>
              <option>Concepción</option>
            </select>
          </div>

          <button type="submit">Ingresar</button>
        </form>
      </main>
    </div>
  );
};

export default Register;