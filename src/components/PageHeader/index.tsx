import React from 'react';

import { Link } from 'react-router-dom'

import logoImg from "../../assets/images/logo.svg"
import backIcon from "../../assets/images/icons/back.svg"

import './styles.css';

//criando uma Interface para tipagem dos dados variaveis e Obrigatoriedade deles
interface PageHeaderProps {
    //definindo propriedade como padrao e atribuindo a tipagem
    title: string;
    //se nao for obrigatorio colocar title?: <atribuir um tipo default>;
    description?: string;
}
//a function tem que virar uma *variavel const
// React.FC (Function Component) - Componente escrito em formato de Funçao
// <PageHeaderProps> Parametro passado para o React.FC
//props - Todas as propriedades
const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header" >
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                {/* props.title - variavel que nos criamos */}
                <strong>{props.title}</strong>
                {/* If ternário, se tiver props.description mostra ele, se nao (:) nullo */}
                {props.description ? <p>{props.description}</p> : null}
                {props.children}
            </div>
        </header >

    );
}

export default PageHeader;