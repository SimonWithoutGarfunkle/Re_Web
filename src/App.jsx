import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import IosComingSoon from './pages/IosComingSoon';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import PolitiqueContenu from './pages/PolitiqueContenu';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import VerifyEmail from './pages/VerifyEmail';
import ConfirmEmailChange from './pages/ConfirmEmailChange';
import ResetPassword from './pages/ResetPassword';
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
          <Route path="/politique-contenu" element={<PolitiqueContenu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/confirm-email-change" element={<ConfirmEmailChange />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
