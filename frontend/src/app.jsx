import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Zapatillas from './components/Zapatillas';
import Zapatos from './components/Zapatos';
import Intranet from './components/Intranet';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registrar" element={<RegisterForm />} />
          <Route path="/zapatillas" element={<Zapatillas />} />
          <Route path="/zapatos" element={<Zapatos />} />
          <Route path="/intranet" element={<Intranet />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
