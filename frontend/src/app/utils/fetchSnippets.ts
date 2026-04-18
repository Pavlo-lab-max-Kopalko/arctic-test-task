import { Dispatch, SetStateAction } from "react";
import { ISnippet } from "../types/snippet";

import { API_URL } from './../config';

type Params = {
  searchQuery?: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSnippets: Dispatch<SetStateAction<ISnippet[]>>,
  setError: Dispatch<SetStateAction<string | null>>,
}

const fetchSnippets = async ({ searchQuery = "", setLoading, setSnippets, setError }: Params) => {
  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/snippets?search=${searchQuery}`);
    const data = await res.json();
    setSnippets(data);
  } catch {
    setError("Не вдалося завантажити дані.");
  } finally {
    setLoading(false);
  }
};

export default fetchSnippets;
