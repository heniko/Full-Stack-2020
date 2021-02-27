import React from 'react';

import { CoursePart } from '../index';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    }

    switch (part.name) {
        case 'Fundamentals':
            return (
                <>
                    <h3>
                        {part.name}
                    </h3>
                    <p>
                        Exercises: {part.exerciseCount}
                    </p>
                    <p>
                        {part.description}
                    </p>
                </>
            );
        case 'Using props to pass data':
            return (
                <>
                    <h3>
                        {part.name}
                    </h3>
                    <p>
                        Exercises: {part.exerciseCount}
                    </p>
                    <p>
                        Group project count: {part.groupProjectCount}
                    </p>
                </>
            );
        case 'Deeper type usage':
            return (
                <>
                    <h3>
                        {part.name}
                    </h3>
                    <p>
                        Exercises: {part.exerciseCount}
                    </p>
                    <p>
                        {part.description}
                    </p>
                    <p>
                        {part.exerciseSubmissionLink}
                    </p>
                </>
            );
        case "Course ending":
            return (
                <>
                    <h3>
                        {part.name}
                    </h3>
                    <p>
                        Exercises: {part.exerciseCount}
                    </p>
                    <p>
                        {part.description}
                    </p>
                    <p>
                        Examinations: {part.examinations}
                    </p>
                </>
            )
        default:
            return assertNever(part);
    }
}

export default Part;