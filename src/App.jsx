import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import IosComingSoon from './pages/IosComingSoon';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import spaceBg from '/space-bg.png';

export default function App() {
  return (
    <BrowserRouter>
      {/* Fixed space background */}
      <div className="space-bg" style={{ backgroundImage: `url(${spaceBg})` }} />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ios" element={<IosComingSoon />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
