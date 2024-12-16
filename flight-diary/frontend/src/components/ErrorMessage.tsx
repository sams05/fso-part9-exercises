const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  const style = {
    color: "red",
  };

  return <p style={style}>{errorMessage}</p>;
};

export default ErrorMessage;
