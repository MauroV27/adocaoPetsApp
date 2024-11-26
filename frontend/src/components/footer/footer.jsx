import React from "react";
import { Link } from 'react-router-dom';
import "./footer.css";

function FooterComponent() {
    return (
        <footer className="footer">
            <div className="footer__container">
                {/* Sessão de Navegação */}
                <div className="footer__section">
                    <h3>Sobre Nós</h3>
                    <p>Somos uma plataforma dedicada a conectar pets que precisam de um lar a pessoas que desejam adotar.</p>
                </div>

                {/* Links úteis */}
                <div className="footer__section">
                    <h3>Links Úteis</h3>
                    <ul className="footer__section__list">
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/adopt">Adote um Pet</Link></li>
                        <li><Link to="/about">Sobre nós</Link></li>
                    </ul>
                </div>

                {/* Redes sociais e contato */}
                <div className="footer__section">
                    <h3>Contato</h3>
                    <p>Email: contato@adocaotech.com</p>
                    <p>Telefone: (00) 0000-0000</p>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer__bottom">
                <p>&copy; 2024 Adoção Tech. Todos os direitos reservados.</p>
            </div>
        </footer>

    );
}

export default FooterComponent;