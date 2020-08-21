import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// importando uma imagem
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';


import './styles.css'
import api from '../../services/api';

function Landing() {
    //variavel de estado para controlar o total de conexões
    const [totalConnections, setTotalConnections] = useState(0);

    // useEffect(()=>{} - função que sera executada sempre que a variavel do array mudar (caso ele fique vazio, executara apenas uma vez),[])

    useEffect(() => {
        //connections é a ROTA
        api.get('connections').then(response => {
            //response traz os dados da API, colocando .data traz o dado
            const { total } = response.data;
            console.log(response)

            setTotalConnections(total);
        })
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    {/* para utilizar uma variavel do JavaScript utilizar {}*/}
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={landingImg}
                    alt="Plataforma de estudos"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                    Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Estudar" />
                    Dar aulas
                    </Link>
                </div>
                <span className="give-classesal-connections">
                    Total de {totalConnections} conexões ja realizadas    <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    )
}

export default Landing;