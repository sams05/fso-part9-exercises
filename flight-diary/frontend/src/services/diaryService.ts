import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const BASE_URL = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(BASE_URL);
  return response.data;
};

export const createDiaryEntry = async (object: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(BASE_URL, object);
  return response.data;
};
