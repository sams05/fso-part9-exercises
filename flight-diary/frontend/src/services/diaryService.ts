import axios from "axios";
import { DiaryEntry } from "../types";

const BASE_URL = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
    return axios.get<DiaryEntry[]>(BASE_URL).then(response => response.data);
};