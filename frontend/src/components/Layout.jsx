import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Layout.css';

const BACKEND_PORT = 8081; // Verifica que coincida con el backend

const Layout = ({ children }) => {
  const [nombre, setNombre] = useState(localStorage.getItem('nombre'));
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const [menuAbierto, setMenuAbierto] = useState(false);

  const isLoggedIn = !!rol;
  const navigate = useNavigate();

  // Actualiza el nombre y rol al detectar cambios en localStorage
  useEffect(() => {
    const onStorage = () => {
      setNombre(localStorage.getItem('nombre'));
      setRol(localStorage.getItem('rol'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <div className="layout">
      {/* 🔹 NAVBAR */}
      <nav className="navbar-custom">
        <div className="nav-left">
          <Link to="/" className="brand">
            <span role="img" aria-label="logo"></span>
            Urban <span className="brand-highlight">Claudia</span>
          </Link>

          <button className="hamburger" onClick={toggleMenu}>
            {menuAbierto ? '✖️' : '☰'}
          </button>
        </div>

        <div className={`nav-links-custom ${menuAbierto ? 'show' : ''}`}>
          <Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
          <Link to="/zapatillas" onClick={() => setMenuAbierto(false)}>Zapatillas</Link>
          <Link to="/zapatos" onClick={() => setMenuAbierto(false)}>Zapatos</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="icon-link" onClick={() => setMenuAbierto(false)}>
                <span role="img" aria-label="login">🔑</span> Iniciar sesión
              </Link>
              <Link to="/registrar" className="icon-link" onClick={() => setMenuAbierto(false)}>
                <span role="img" aria-label="register">👤</span> Registrarse
              </Link>
            </>
          ) : (
            <>
              <span className="icon-link user-name">
                <span role="img" aria-label="user">👤</span> {nombre || 'Usuario'}
              </span>
              <button className="icon-link" onClick={() => { handleLogout(); setMenuAbierto(false); }}>
                <span role="img" aria-label="logout">🚪</span> Cerrar sesión
              </button>
            </>
          )}
        </div>

        <div className="nav-right">
          <span className="icon-link">
            <span role="img" aria-label="search">🔍</span>
          </span>
        </div>
      </nav>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <main className="main-content">
        {children}
      </main>

      {/* 🔹 FOOTER */}
      <footer className="footer-custom">
        <div className="footer-col">
          <div className="footer-brand">
            <span className="brand-highlight">Urban Claudia</span>
          </div>
          <p>
            Calzados de todo tipo para ti, al mejor precio y con la mejor calidad.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com" className="facebook" target="_blank" rel="noopener noreferrer"></a>
            <a href="https://www.instagram.com/urbanclaudia/" className="instagram" target="_blank" rel="noopener noreferrer"></a>
            <a href="https://wa.me/51935532263" className="whatsapp" target="_blank" rel="noopener noreferrer"></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/zapatillas">Zapatillas</Link></li>
            <li><Link to="/zapatos">Zapatos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Información</h4>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Política de envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li>Mza. C-10 Int. 65, Lote 3, Urb. Las Banderas, Callao</li>
            <li>+51 935 532 264</li>
            <li><a href="mailto:contacto@urbanclaudia.com">contacto@urbanclaudia.com</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
