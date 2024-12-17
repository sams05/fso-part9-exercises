import { useState } from "react";
import { createDiaryEntry } from "../services/diaryService";
import { DiaryEntry, Visibility, Weather } from "../types";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

const DiaryEntryForm = ({
  update,
}: {
  update: (diaries: DiaryEntry) => void;
}) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const setError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const newEntry = await createDiaryEntry({
        date,
        weather: weather as Weather,
        visibility: visibility as Visibility,
        comment,
      });
      update(newEntry);

      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data);
        }
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <ErrorMessage errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          <label>
            date
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div>
          <fieldset>
            <legend>weather</legend>
            {Object.values(Weather).map((weatherVal) => (
              <label key={weatherVal}>
                {weatherVal}
                <input
                  type="radio"
                  name="weather"
                  checked={weatherVal === weather}
                  onChange={() => setWeather(weatherVal)}
                />
              </label>
            ))}
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>visibility</legend>
            {Object.values(Visibility).map((visibilityVal) => (
              <label key={visibilityVal}>
                {visibilityVal}
                <input
                  type="radio"
                  name="visibility"
                  checked={visibilityVal === visibility}
                  onChange={() => setVisibility(visibilityVal)}
                />
              </label>
            ))}
          </fieldset>
        </div>
        <div>
          <label>
            comment
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
