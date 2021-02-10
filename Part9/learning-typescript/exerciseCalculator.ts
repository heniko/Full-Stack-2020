interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface ExerciseArguments {
    target: number,
    dailyHours: Array<number>
}

const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
    const periodLength: number = dailyHours.length;
    const trainingDays: number = dailyHours.reduce((accumulator: number, currentValue: number): number => {
        return currentValue > 0 ? accumulator + 1 : accumulator;
    }, 0);
    const average: number = dailyHours.reduce((accumulator: number, currentValue: number): number => {
        return accumulator + currentValue;
    }, 0) / periodLength;
    const success: boolean = average >= target;
    let rating: number;
    let ratingDescription: string;
    if (average < target / 2) {
        rating = 1;
        ratingDescription = 'far from target';
    } else if (average < target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'target reached';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    for (let i = 2; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error('Provided values were not numbers');
        }
    }
    return {
        target: Number(args[2]),
        dailyHours: args.slice(3).map(value => Number(value))
    };
};

try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
} catch (error) {
    console.log('Error! Something went wrong, message: ', (<Error>error).message);
}