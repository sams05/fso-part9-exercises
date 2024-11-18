interface hoursTarget {
  dailyHours: number[];
  target: number;
}

const parseArguments = (args: string[]): hoursTarget => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const target = args[2];
  const dailyHours = args.slice(3);

  if (isNaN(+target)) {
    throw new Error("Provided target is not a number");
  }
  for (const hour of dailyHours) {
    if (isNaN(+hour) || +hour < 0) {
      throw new Error("The daily hours are not valid");
    }
  }
  return { dailyHours: dailyHours.map((hour) => +hour), target: +target };
};

interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hour) => hour > 0).length;
  const totalHours = dailyHours.reduce(
    (totalHours, curHours) => totalHours + curHours
  );
  const average = totalHours / periodLength;
  const success = average >= target;
  let rating: 1 | 2 | 3;
  let ratingDescription;
  const OK_THRESHOLD_PCT = 0.8;
  if (average < OK_THRESHOLD_PCT * target) {
    rating = 1;
    ratingDescription = "bad, need more exercise";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "not bad, but could still get more exercise";
  } else {
    rating = 3;
    ratingDescription = "good, got all the needed exercise";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export default calculateExercises;

if (require.main === module) {
  try {
      const {dailyHours, target} = parseArguments(process.argv);
      console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
      let errorMessage = "An error has occurred";
      if (error instanceof Error) {
        errorMessage += "\nError: " + error.message;
      }
      console.log(errorMessage);
  }
}