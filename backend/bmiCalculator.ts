const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  let message: string;
  if (bmi < 18.5) {
    message = "Underweight";
  } else if (bmi < 25) {
    message = "Normal range";
  } else if (bmi < 30) {
    message = "Overweight";
  } else {
    message = "Obese";
  }
  return message;
};

console.log(calculateBmi(180, 74));
