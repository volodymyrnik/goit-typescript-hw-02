import axios from "axios";
import toast from "react-hot-toast";
import { Photo } from "./App";

async function fetchPhoto(searchPhoto: string, currentPage: number): Promise<Photo[]> {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        client_id: "z8144xIr3jiDfWLbNaYR5XPX1KLupaOi2kMtpvAB7s4",
        query: searchPhoto,
        per_page: 9,
        page: currentPage,
      },
    });
    return response.data.results || [];
  } catch (error) {
    toast.error("Error! Please, reload page!");
    return [];
  }
}

export default fetchPhoto;