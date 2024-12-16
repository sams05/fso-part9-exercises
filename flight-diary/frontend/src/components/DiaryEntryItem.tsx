import { DiaryEntry } from "../types";

const DiaryEntryItem = ({ diaryEntry }: { diaryEntry: DiaryEntry }) => {
  return (
    <div>
      <h3>{diaryEntry.date}</h3>
      <p>weather: {diaryEntry.weather}</p>
      <p>visibility: {diaryEntry.visibility}</p>
    </div>
  );
};

export default DiaryEntryItem;
