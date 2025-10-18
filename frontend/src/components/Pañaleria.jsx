import React, { useState, useEffect } from "react";
import "../css/Pañaleria.css";

// Importar las imágenes locales para el carrusel
import bebeImg from "../imagenes/bebe.png";
import bebe2Img from "../imagenes/bebe3.png";
import pañal1Img from "../imagenes/pañal1.jpg";
import pañal2Img from "../imagenes/pañal2.jpg";
import pañal4Img from "../imagenes/pañal3.jpg";
import pañal5Img from "../imagenes/pañal4.jpg";
import pañal6Img from "../imagenes/pañal5.jpg";

// Carrusel
const Carrusel = () => {
  const images = [bebeImg, bebe2Img, pañal1Img, pañal2Img, pañal4Img, pañal5Img, pañal6Img];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 11000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = index => setCurrent(index);

  return (
    <div className="carrusel-container fade-in-carrusel">
      <div className="carrusel" style={{
        width: `${images.length * 100}%`,
        transform: `translateX(-${(100 / images.length) * current}%)`,
        display: 'flex',
        transition: 'transform 1s ease-in-out'
      }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagen ${index + 1}`}
            className="carrusel-image"
            style={{ width: `${100 / images.length}%` }}
          />
        ))}
      </div>
      <div className="dots-container">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === current ? "active" : ""}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

function Pañaleria() {
  const [filtroActivo, setFiltroActivo] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const filtros = ["Todos", "Bebé", "Adulto", "Higiene"];

  return (
    <div className="pañaleria-wrapper">
      {/* Carrusel */}
      <Carrusel />

      {/* Barra de búsqueda */}
      <div className="barra-busqueda fade-in-down">
        <label htmlFor="busqueda">Buscar:</label>
        <input
          id="busqueda"
          type="text"
          placeholder="Nombre o tipo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="higiene-wrapper fade-in-left">
        {/* Filtro lateral */}
        <aside className="filtro-lateral">
          <h3>Filtrar por tipo</h3>
          {filtros.map((tipo) => (
            <button
              key={tipo}
              className={`filtro-btn ${filtroActivo === tipo ? 'activo' : ''}`}
              onClick={() => setFiltroActivo(tipo)}
            >
              {tipo}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default Pañaleria;