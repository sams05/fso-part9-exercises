import { useState, useEffect } from "react";
import { getAllDiaries } from "./services/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntryItem from "./components/DiaryEntryItem";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <>
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
