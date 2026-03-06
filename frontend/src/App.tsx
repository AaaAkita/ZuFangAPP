import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import SafetyPage from './pages/SafetyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="safety" element={<SafetyPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
}
