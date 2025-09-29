import React from 'react';

const Card = ({children, className}) => {
    return (
        <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 px-6 dark:border-gray-800 dark:bg-white/[0.01] ${className}`}>
            {children}
        </div>
    );
};

export default Card;