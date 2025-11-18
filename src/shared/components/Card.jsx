import React from 'react';
import CardTitulo from './CardTitulo';

const Card = ({children, className}) => {
    return (
        <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.01] ${className}`}>
            {children}
        </div>
    );
};

export default Card;