import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Download from './pages/Download';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import ConditionsUtilisation from './pages/ConditionsUtilisation';
import PolitiqueContenu from './pages/PolitiqueContenu';
import Profile from './pages/Profile';
import DeleteAccount from './pages/DeleteAccount';
import Contact from './pages/Contact';
import Soutenir from './pages/Soutenir';
import VerifyEmail from './pages/VerifyEmail';
import ConfirmEmailChange from './pages/ConfirmEmailChange';
import ResetPassword from './pages/ResetPassword';
import spaceBg from '/space-bg.png';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Fixed space background */}
      <div className="space-bg" style={{ backgroundImage: `url(${spaceBg})` }} />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/telecharger" element={<Download />} />
          <Route path="/ios" element={<Navigate to="/telecharger" replace />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
          <Route path="/politique-contenu" element={<PolitiqueContenu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/supprimer-mon-compte" element={<DeleteAccount />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/soutenir" element={<Soutenir />} />
          <Route path="/testeurs" element={<Navigate to="/soutenir" replace />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/confirm-email-change" element={<ConfirmEmailChange />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
