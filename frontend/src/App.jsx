import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import HomePageComponent from './pages/home/home';
import MenuBarComponent from './components/menu-bar/menu-bar';
import FooterComponent from './components/footer/footer';
import ListPetsPage from './pages/list-pets/list-pets';
import PetDetailPage from './pages/pet-page/pet-page';

function App() {

    return (
        <BrowserRouter >
            <MenuBarComponent />

            {/* Rotas para renderizar as páginas */}
            <Routes>
                <Route path="/" element={<HomePageComponent />} />
                <Route path="/about" element={<p>Sobre...</p>} />
                <Route path='/adoption' element={<ListPetsPage />} />
                <Route path="/pet/:id" element={<PetDetailPage />} />
            </Routes>

            <FooterComponent />
        </BrowserRouter >
  )
}

export default App
