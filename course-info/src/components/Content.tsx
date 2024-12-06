interface Part {
  name: string;
  exerciseCount: number;
}

const Content = ({ parts }: { parts: Part[] }) => {
  return (
    <div>
      {parts.map(({ name, exerciseCount }) => (
        <p>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
