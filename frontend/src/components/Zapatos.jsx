import React, { useState, useEffect } from "react";
import "../css/Zapatos.css";

import zapato1 from "../imagenes/Zapatos1.jpg";
import zapato2 from "../imagenes/Zapatos2.jpg";
import zapato3 from "../imagenes/Zapatos3.png";
import zapato4 from "../imagenes/Zapatos4.png";
import zapato5 from "../imagenes/Zapatos5.png";

// ======== COMPONENTE CARRUSEL ========
const Carrusel = () => {
  const images = [zapato1, zapato2, zapato3, zapato4, zapato5];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carrusel-wrapper">
      <div className="carrusel-container fade-in-carrusel">
        <div
          className="carrusel"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${(100 / images.length) * current}%)`,
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Zapato ${index + 1}`}
              className="carrusel-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ======== COMPONENTE PRINCIPAL ========
function Zapatos() {
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const filtros = ["Todos", "Hombre", "Mujer", "Niño"];

  const productos = [
    {
      id: 1,
      tipo: "Hombre",
      nombre: "Zapato Formal Cuero",
      descripcion: "Elegantes zapatos de cuero para ocasiones formales.",
      precio: 420,
      imagen: zapato1,
    },
    {
      id: 2,
      tipo: "Mujer",
      nombre: "Zapato Tacón Alto",
      descripcion: "Diseño moderno y cómodo para eventos o trabajo.",
      precio: 390,
      imagen: zapato2,
    },
    {
      id: 3,
      tipo: "Niño",
      nombre: "Zapato Escolar Niño",
      descripcion: "Zapato resistente ideal para uso escolar diario.",
      precio: 250,
      imagen: zapato3,
    },
    {
      id: 4,
      tipo: "Hombre",
      nombre: "Zapato Casual Hombre",
      descripcion: "Perfecto para un look relajado pero elegante.",
      precio: 360,
      imagen: zapato4,
    },
    {
      id: 5,
      tipo: "Mujer",
      nombre: "Zapato Casual Mujer",
      descripcion: "Comodidad y estilo para el día a día.",
      precio: 340,
      imagen: zapato5,
    },
  ];

  const productosFiltrados = productos.filter(
    (p) =>
      (filtroActivo === "Todos" || p.tipo === filtroActivo) &&
      (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="zapatos-wrapper">
      <Carrusel />

      {/* 🔍 Barra de búsqueda */}
      <div className="barra-busqueda fade-in-down">
        <label htmlFor="busqueda">Buscar:</label>
        <input
          id="busqueda"
          type="text"
          placeholder="Buscar zapatos..."
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
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="card-img"
                />
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

export default Zapatos;
