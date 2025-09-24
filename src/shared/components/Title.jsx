import React from 'react';

const Title = ({ children, className }) => {
    return (
        <h2 className={`font-semibold text-2xl text-gray-700 dark:text-white/90 my-3 ${className}`}>{children}</h2>
    )
}

export default Title;