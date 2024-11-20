import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import HomePageComponent from './pages/home/home';
import MenuBarComponent from './components/menu-bar/menu-bar';
import FooterComponent from './components/footer/footer';

function App() {

    return (
        <BrowserRouter >
            <MenuBarComponent />

            {/* Rotas para renderizar as páginas */}
            <Routes>
                <Route path="/" element={<HomePageComponent />} />
                <Route path="/about" element={<p>Sobre...</p>} />
            </Routes>

            <FooterComponent />
        </BrowserRouter >
  )
}

export default App
