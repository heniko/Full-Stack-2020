import React from 'react';

import { CoursePart } from '../index';

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
    return (
        <>
            <h4>
                Total number of exercises {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}.
            </h4>
        </>
    );
}

export default Total;