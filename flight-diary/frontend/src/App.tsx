import { useState, useEffect } from "react";
import { getAllDiaries } from "./services/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntryItem from "./components/DiaryEntryItem";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const cacheNewEntry = (newEntry: DiaryEntry) => setDiaries(diaries.concat(newEntry));

  return (
    <>
      <div>
        <h2>Add new entry</h2>
        <DiaryEntryForm update={cacheNewEntry} />
      </div>
      <div>
        <h2>Diary Entries</h2>
        {diaries.map((diaryEntry) => (
          <DiaryEntryItem key={diaryEntry.id} diaryEntry={diaryEntry} />
        ))}
      </div>
    </>
  );
};

export default App;
