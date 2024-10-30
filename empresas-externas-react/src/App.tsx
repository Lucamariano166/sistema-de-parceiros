// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import PartnerList from './components/PartnerList';
import About from './components/About';
import CreatePartner from './components/CreatePartner';
import EditPartner from './components/EditPartner';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path="partners" element={<PartnerList />} />
          <Route path="create-partner" element={<CreatePartner />} />  {/* Adiciona a rota de criação */}
          <Route path="edit-partner/:id" element={<EditPartner />} />   {/* Adiciona a rota de edição */}
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;