import axios from "axios";

export async function fetchHotCollections() {
  const url = process.env.REACT_APP_HOT_COLLECTIONS_URL;
  const res = await axios.get(url);
  return res.data;
}
