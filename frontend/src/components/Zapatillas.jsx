import React, { useState, useEffect } from "react";
import "../css/Zapatillas.css";

import zapatilla1 from "../imagenes/zapatillas1.jpg";
import zapatilla2 from "../imagenes/zapatillas2.jpg";
import zapatilla3 from "../imagenes/zapatillas3.jpg";
import zapatilla4 from "../imagenes/zapatillas4.jpg";
import zapatilla5 from "../imagenes/zapatillas5.jpg";

// ===== CARRUSEL =====
const Carrusel = () => {
  const images = [zapatilla1, zapatilla2, zapatilla3, zapatilla4, zapatilla5];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carrusel-full fade-in-carrusel">
      <div
        className="carrusel"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(100 / images.length) * current}%)`,
          display: "flex",
          transition: "transform 1s ease-in-out",
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Zapatilla ${index + 1}`}
            className="carrusel-image"
          />
        ))}
      </div>
    </div>
  );
};

// ===== COMPONENTE PRINCIPAL =====
function Zapatillas() {
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const filtros = ["Todos", "Hombre", "Mujer", "Niño"];

  const productos = [
    {
      id: 1,
      tipo: "Hombre",
      nombre: "Nike Air Max",
      descripcion: "Zapatillas deportivas cómodas con cámara de aire y diseño moderno.",
      precio: 350,
      imagen: zapatilla1,
    },
    {
      id: 2,
      tipo: "Mujer",
      nombre: "Adidas Superstar",
      descripcion: "Clásicas y elegantes, perfectas para uso casual o urbano.",
      precio: 320,
      imagen: zapatilla2,
    },
    {
      id: 3,
      tipo: "Niño",
      nombre: "Puma Runner Kids",
      descripcion: "Livianas, resistentes y con gran agarre para los pequeños deportistas.",
      precio: 250,
      imagen: zapatilla3,
    },
    {
      id: 4,
      tipo: "Hombre",
      nombre: "Reebok Classic",
      descripcion: "Diseño retro con materiales duraderos para uso diario.",
      precio: 300,
      imagen: zapatilla4,
    },
    {
      id: 5,
      tipo: "Mujer",
      nombre: "Vans Old Skool",
      descripcion: "Estilo skater con suela vulcanizada y detalles en gamuza.",
      precio: 280,
      imagen: zapatilla5,
    },
  ];

  const productosFiltrados = productos.filter(
    (p) =>
      (filtroActivo === "Todos" || p.tipo === filtroActivo) &&
      (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="zapatillas-wrapper">
      <Carrusel />

      {/* 🔍 Barra de búsqueda */}
      <div className="barra-busqueda fade-in-down">
        <label htmlFor="busqueda">Buscar:</label>
        <input
          id="busqueda"
          type="text"
          placeholder="Buscar zapatillas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="contenido-principal fade-in-left">
        {/* 🧩 Filtro lateral */}
        <aside className="filtro-lateral">
          <h3>Filtrar por tipo</h3>
          {filtros.map((tipo) => (
            <button
              key={tipo}
              className={`filtro-btn ${filtroActivo === tipo ? "activo" : ""}`}
              onClick={() => setFiltroActivo(tipo)}
            >
              {tipo}
            </button>
          ))}
        </aside>

        {/* 🛍️ Catálogo */}
        <section className="catalogo">
          {productosFiltrados.map((producto) => (
            <div className="card fade-in" key={producto.id}>
              <a href="#" className="card-link">
                <img src={producto.imagen} alt={producto.nombre} className="card-img" />
              </a>
              <div className="card-body">
                <h4>{producto.nombre}</h4>
                <p className="descripcion">{producto.descripcion}</p>
                <p className="precio">S/. {producto.precio}</p>
                <button className="btn-agregar">Añadir al carrito</button>
              </div>
            </div>
          ))}
          {productosFiltrados.length === 0 && (
            <p className="no-result">No se encontraron productos.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Zapatillas;
