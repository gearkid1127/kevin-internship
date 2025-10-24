import axios from "axios";

export async function fetchHotCollections() {
  const url = process.env.REACT_APP_HOT_COLLECTIONS_URL;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchNewItems() {
  const url = process.env.REACT_APP_NEW_ITEMS_URL;
  const res = await axios.get(url);
  return res.data;
}
export async function fetchTopSellers() {
  const url = process.env.REACT_APP_TOP_SELLERS_URL;
  const res = await axios.get(url);
  return res.data;
}


export async function fetchExplore(filter) {
  const url = process.env.REACT_APP_EXPLORE_URL;
  const res = await axios.get(url, {
    params: filter ? { filter } : {},
  });
  return res.data;
}

export async function fetchAuthorById(id) {
  const url =
    process.env.REACT_APP_AUTHOR_URL ||
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";
  const res = await axios.get(url, { params: { author: id } });
  return res.data;
}
export async function fetchItemDetails(id) {
  const url =
    process.env.REACT_APP_ITEM_DETAILS_URL ||
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails";
  const res = await axios.get(url, { params: { nftId: id } });
  return res.data;
}
