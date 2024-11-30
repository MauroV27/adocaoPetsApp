import React from 'react';
import './about.css';

function AboutPage() {
    return (
        <div className="about__page">
            {/* Seção: Sobre Nós */}
            <section className="about__section">
                <h2>Sobre Nós</h2>
                <p>
                    Somos uma organização dedicada a conectar animais abandonados ou resgatados com novas famílias amorosas. 
                    Nosso objetivo é garantir que cada animal tenha uma vida digna e cheia de carinho.
                </p>
            </section>

            {/* Seção: Nossa Missão */}
            <section className="mission__section">
                <h2>Nossa Missão</h2>
                <p>
                    Acreditamos que todos os animais merecem um lar. Nossa missão é resgatar, cuidar e encontrar lares 
                    permanentes para animais em necessidade. Trabalhamos incansavelmente para educar a comunidade sobre a 
                    importância da adoção responsável.
                </p>
            </section>

            {/* Seção: Como Você Pode Ajudar */}
            <section className="help__section">
                <h2>Como Você Pode Ajudar</h2>
                <p>
                    Existem várias maneiras de ajudar: você pode adotar, ser um lar temporário, ou fazer doações para 
                    apoiar nossos esforços. Junte-se a nós e faça a diferença na vida de muitos animais!
                </p>
            </section>
        </div>
    );
}

export default AboutPage;