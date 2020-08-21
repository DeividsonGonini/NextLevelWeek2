import React, { InputHTMLAttributes } from 'react';

import './styles.css'

// InputHTMLAttributes = possibilita adicionar qualquer atributo HTML no input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;

}

// ...rest propriedade que possibilita adicionar qualquer atributo HTML no input
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    )
}

export default Input;