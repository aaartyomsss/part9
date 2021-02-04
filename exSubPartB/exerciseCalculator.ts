interface Result {
    periodLenght: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const array: Array<number> = [];
for (let n = 2; n < process.argv.length; n++) {
    if(isNaN(Number(process.argv[n]))) throw new Error('Input is not a number!');
    array.push(Number(process.argv[n]));
}

const exerciseCalculator = (exercises: Array<number>) : Result => {
    if (exercises.length === 0) throw new Error('No input was entered');
    const exDays: number = exercises.filter(d => d > 0).length;
    const numOfDays: number = exercises.length;
    const s: boolean = exDays > 3 ? true : false;
    const average: number = exercises.reduce((sum, current) => sum + current) / exDays;
    const target: number = Math.round(average) + 1;
    const rating: number = average > 2 ? 3 : average > 1.2 ? 2 : 1;
    const ratingDescription: string = rating === 3 ? 'Amazingly done' : rating === 2 ? 'Not bad, but could be better' : 'Well... you should do better';
    return {
        periodLenght: numOfDays,
        trainingDays: exDays,
        success: s,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

try {
    console.log(exerciseCalculator(array));
} catch (error) {
    // eslint-disable-next-line
    console.error('Error occured: ', error.message); 
}

