import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import '../styles/style.css';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    pass: ''
  });
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      login(formData.correo, formData.pass);
      alert('Inicio de sesión exitoso!');
      navigate('/');
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  return (
    <div>
      <Header />
      
      <main>
        <form className="form-login" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>

          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
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

          <button type="submit">Ingresar</button>
        </form>
      </main>
    </div>
  );
};

export default Login;