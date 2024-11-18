interface heightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): heightWeight => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 4) {
    throw new Error("Too much arguments");
  }

  const [height, weight] = args.slice(2, 4);
  if (isNaN(+height) || isNaN(+weight)) {
    throw new Error("Provided arguments are not numbers");
  }
  return { height: +height, weight: +weight };
};

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

export default calculateBmi;

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "An error has occurred";
    if (error instanceof Error) {
      errorMessage += "\nError: " + error.message;
    }
    console.log(errorMessage);
  }  
}