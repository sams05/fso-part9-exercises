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
  let okThresholdPct = 0.8;
  if (average < okThresholdPct * target) {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
