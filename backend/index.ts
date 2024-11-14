import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(+height) || isNaN(+weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const heightNum = +height;
  const weightNum = +weight;
  const bmi = calculateBmi(heightNum, weightNum);

  res.json({
    weight: weightNum,
    height: heightNum,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyHours, target } = req.body;

  if (dailyHours == null || target == null) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  // Validate target can be converted to number and dailyHours is an array
  if (isNaN(+target) || !Array.isArray(dailyHours)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  // validate that all the entries of dailyHours can be converted to numbers >= 0
  for (const hour of dailyHours) {
    if (isNaN(+hour) || +hour < 0) {
      res.status(400).json({ error: "malformatted parameters" });
      return;
    }
  }
  // Convert all entries of dailyHours to numbers
  const validatedDailyHours: number[] = dailyHours.map((hour) => +hour);

  res.json(calculateExercises(validatedDailyHours, +target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
