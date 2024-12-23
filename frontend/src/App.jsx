import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import HomePageComponent from './pages/home/home';
import MenuBarComponent from './components/menu-bar/menu-bar';
import FooterComponent from './components/footer/footer';
import ListPetsPage from './pages/list-pets/list-pets';
import PetDetailPage from './pages/pet-page/pet-page';
import LoginPage from './pages/user/login/login';
import RegisterUserPage from './pages/user/register-user/register-user';
import UserProfilePage from './pages/user/profile/profile';
import AboutPage from './pages/about/about';

function App() {

    return (
        <BrowserRouter >
            <MenuBarComponent />

            {/* Rotas para renderizar as páginas */}
            <Routes>
                <Route path="/" element={<HomePageComponent />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path='/adoption' element={<ListPetsPage />} />
                <Route path="/pet/:id" element={<PetDetailPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterUserPage />} />
                <Route path='/profile' element={<UserProfilePage />} />
            </Routes>

            <FooterComponent />
        </BrowserRouter >
  )
}

export default App
