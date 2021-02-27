import React from 'react';

const Total: React.FC<{ parts: Array<{ name: string, exerciseCount: number }> }> = ({ parts }) => {
    return (
        <>
            <p>
                Number of exercises {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}.
            </p>
        </>
    );
}

export default Total;