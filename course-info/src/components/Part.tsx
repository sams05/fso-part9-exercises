import { CoursePart } from "../types";
import { assertNever } from "../utils";

export const Part = ({ part }: { part: CoursePart }) => {
  const partHeading = (
    <p>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
    </p>
  );
  switch (part.kind) {
    case "basic":
      return (
        <div>
          {partHeading}
          <em>{part.description}</em>
        </div>
      );
      break;
    case "background":
      return (
        <div>
          {partHeading} <em>{part.description}</em>{" "}
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
      break;
    case "group":
      return (
        <div>
          {partHeading}
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
      break;
    case "special":
      return (
        <div>
          {partHeading} <em>{part.description}</em>{" "}
          <p>required sklls: {part.requirements.join(", ")}</p>
        </div>
      );
      break;
    default:
      return assertNever(part);
  }
};
