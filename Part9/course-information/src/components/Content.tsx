import React from 'react';

const Content: React.FC<{ parts: Array<{ name: string, exerciseCount: number }> }> = ({ parts }) => {
    return (
        <>
            {
                parts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>)
            }
        </>
    );
}

export default Content;