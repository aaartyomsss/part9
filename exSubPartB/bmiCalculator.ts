export const calculateBmi = (height: number, mass: number): string => {

    if(isNaN(height) || isNaN(mass)) throw new Error('Invalid input format!');
    const bmi: number = mass / ((height / 100) * (height / 100));
    if (bmi < 15) {
        return 'Very severely underweight';
    } else if (bmi < 16) {
        return 'Severely underweight';
    } else if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal weight';
    } else if (bmi < 30) {
        return 'Overweight';
    } else if (bmi < 35) {
        return 'Obese Class I';
    } else if (bmi < 40) {
        return 'Obese Class II';
    } else {
        return 'Obese Class III';
    }
};

try {
    console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
} catch (error) {
    // eslint-disable-next-line
    console.error('Error occured: ', error.message);
}


